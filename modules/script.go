package modules

import (
	"encoding/json"
	"errors"
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/js"
	"os"
	"path"
)

// ---------------------------------
// Vars

// ScriptStruct struct for the project
type ScriptStruct struct {
	Src     string `toml:"source"`
	Dest    string `toml:"destination"`
	Ignore  string
	Order   int
	Env     string
	Sys     string
	Options scriptOptionsStruct
}

type scriptOptionsStruct struct {
	Minify bool

	// Webpack related
	Context           string
	Entry             string
	Output            scriptOutputStruct
	Module            scriptModuleStruct
	Resolve           scriptResolveStruct
	ResolveLoader     scriptResolveStruct `toml:"resolve_loader"`
	Externals         []string
	Target            string
	Bail              bool
	Profile           bool
	Cache             bool
	Debug             bool
	Devtool           string
	DevServer         string `toml:"dev_server"`
	Node              string
	Amd               string
	Loader            string
	RecordsPath       string `toml:"records_path"`
	RecordsInputPath  string `toml:"records_input_path"`
	RecordsOutputPath string `toml:"records_output_path"`
	Plugins           scriptPluginsStruct
}

type scriptOutputStruct struct {
	Filename                              string
	Path                                  string
	PublicPath                            string `toml:"public_path"`
	ChunkFilename                         string `toml:"chunk_filename"`
	SourceMapFilename                     string `toml:"source_map_filename"`
	DevtoolModuleFilenameTemplate         string `toml:"devtool_module_filename_template"`
	DevtoolFallbackModuleFilenameTemplate string `toml:"devtool_fallback_module_filename_template"`
	DevtoolLineToLine                     bool   `toml:"devtool_line_to_line"`
	HotUpdateChunkFilename                string `toml:"hot_update_chunk_filename"`
	HotUpdateMainFilename                 string `toml:"hot_update_main_filename"`
	JsonpFunction                         string `toml:"jsonp_function"`
	HotUpdateFunction                     string `toml:"hot_update_function"`
	Pathinfo                              bool
	Library                               string
	LibraryTarget                         string `toml:"library_target"`
	UmdNamedDefine                        bool   `toml:"umd_named_define"`
	SourcePrefix                          string `toml:"source_prefix"`
	CrossOriginLoading                    string `toml:"cross_origin_loading"`
}

type scriptModuleStruct struct {
	PreLoaders             []scriptLoaderStruct `toml:"pre_loaders"`
	Loaders                []scriptLoaderStruct
	PostLoaders            []scriptLoaderStruct `toml:"post_loaders"`
	NoParse                []string             `toml:"no_parse"`
	UnknownContextRegExp   string               `toml:"unknown_context_reg_exp"`
	UnknownContextCritical bool                 `toml:"unknown_context_critical"`
	ExprContextRegExp      string               `toml:"expr_context_reg_exp"`
	ExprContextCritical    bool                 `toml:"expr_context_critical"`
	WrappedContextRegExp   string               `toml:"wrapper_context_reg_exp"`
	WrappedContextCritical bool                 `toml:"wrapped_context_critical"`
}

type scriptLoaderStruct struct {
	Test    string
	Exclude string
	Include []string
	Loader  string
	Loaders []string
	Query   scriptLoaderQueryStruct

	Dependencies []string
}

type scriptLoaderQueryStruct struct {
	CacheDirectory bool `toml:"cache_directory"`
	Presets        []string
}

type scriptResolveStruct struct {
	Alias              []string
	Root               []string
	ModulesDirectories []string `toml:"modules_directories"`
	Fallback           []string
	Extensions         []string
	PackageMains       []string `toml:"package_mains"`
	PackageAlias       string   `toml:"package_alias"`
	UnsafeCache        []string `toml:"unsafe_cache"`
	ModuleTemplates    []string `toml:"module_templates"` // ResolveLoader only
}

type scriptPluginsStruct struct {
	Dedupe  bool
	NodeEnv string `toml:"node_env"`
}

// ---------------------------------
// Public functions

// ScriptTask for init
func ScriptTask(config []ScriptStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get the right paths
		src, ignore := GetPaths(task.Src, task.Ignore)
		originalDest := task.Dest

		// Go through each in the glob
		for _, file := range src {
			// Check if is in the ignore
			if ArrContainsStr(ignore, file) {
				continue
			}

			// Style file
			Log("script", file)

			// Reset dest
			task.Dest = originalDest

			// Needs this
			task.Dest = ConstructDest("script", task.Dest, file, task.Src)
			task.Src = file

			logVal, err := ScriptFile(task)
			LogErr("script", err)
			Log("script] [result", logVal)
		}
	}
}

// ScriptFile compiles file
func ScriptFile(file ScriptStruct) (log string, err error) {
	src := file.Src

	if NotExist(src) {
		return "", errors.New("File doesn't exist")
	}

	// Now we need to post process
	log, err = scriptWebpackFile(file)
	if err != nil {
		return "", err
	}

	// Now we need to post process
	if file.Options.Minify {
		logMin, err := scriptMinifyJs(file)
		if err != nil {
			return "", err
		}

		// Lets take care of the log
		log = log + " " + logMin
	}

	return
}

// ---------------------------------
// Private functions

// scriptWebpackFile bundles the file
func scriptWebpackFile(file ScriptStruct) (log string, err error) {
	src := file.Src
	dest := file.Dest

	// Install dependencies
	if NotExist("node_modules/webpack") {
		_, err = RawCommand(RawStruct{
			Command: "npm",
			Args:    []string{"install", "webpack@1.12.2"},
		})

		if err != nil {
			return "", err
		}
	}

	// Lets install dependencies
	for _, loader := range file.Options.Module.Loaders {
		for _, dep := range loader.Dependencies {
			// Install
			if NotExist("node_modules/" + dep) {
				_, err = RawCommand(RawStruct{
					Command: "npm",
					Args:    []string{"install", dep},
				})

				if err != nil {
					return "", err
				}
			}
		}
	}

	// Set needed files
	file.Options.Output.Filename = path.Base(dest)
	file.Options.Output.Path = path.Dir(dest)
	file.Options.Entry = src

	// Stringify the options
	options, _ := json.Marshal(file.Options)
	optionsString := string(options)

	// Lets get the paths for the script
	basePath := path.Join(CmdDir, "..")
	vendorPath := path.Join(basePath, "node_modules")
	scriptPath := path.Join(basePath, "modules/external/script/webpack.js")

	// Now lets run the script
	log, err = RawCommand(RawStruct{
		Command: "node",
		Args:    []string{scriptPath, vendorPath, optionsString},
	})

	return log, err
}

// uglifyFile uglify the file
func scriptMinifyJs(file ScriptStruct) (log string, err error) {
	src := file.Dest
	min := minify.New()
	min.AddFunc("text/javascript", js.Minify)

	// Get file
	fileParse, err := os.Open(src)
	if err != nil {
		return "", err
	}

	destFile, err := os.Create(src + ".tmp")
	if err != nil {
		return "", err
	}

	if err := min.Minify("text/javascript", destFile, fileParse); err != nil {
		return "", err
	}

	// No need for the other file
	FileRemove(FileStruct{Src: src})
	FileRename(FileStruct{Src: src + ".tmp", Dest: src})

	return
}
