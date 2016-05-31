package modules

import (
	"errors"
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/css"
	"github.com/wellington/go-libsass"
	"os"
	"path"
)

// ---------------------------------
// Vars

// StyleStruct struct for the project
type StyleStruct struct {
	Src     string `toml:"source"`
	Dest    string `toml:"destination"`
	Ignore  string
	Order   int
	Env     string
	Sys     string
	Options styleOptionsStruct
}

type styleOptionsStruct struct {
	Minify       bool
	Autoprefixer string

	Precision    int      `toml:"precision"`
	Comments     bool     `toml:"comments"`
	IncludePaths []string `toml:"include_paths"`
	HTTPPath     string   `toml:"http_path"`
	SourceMap    bool     `toml:"source_map"`
	BasePath     string   `toml:"base_path"`
}

// ---------------------------------
// Public functions

// StyleTask for init
func StyleTask(config []StyleStruct, order int, env string, sys string) {
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
			Log("style", file)

			// Reset dest
			task.Dest = originalDest

			// Needs this
			task.Dest = ConstructDest("style", task.Dest, file, task.Src)
			task.Src = file

			logVal, err := StyleFile(task)
			LogErr("style", err)
			Log("style] [result", logVal)
		}
	}
}

// StyleFile compiles file
func StyleFile(file StyleStruct) (log string, err error) {
	src := file.Src

	if NotExist(src) {
		return "", errors.New("File doesn't exist")
	}

	// Decide now the type of file
	extension := path.Ext(src)
	if extension == ".sass" || extension == ".scss" {
		log, err = styleScss(file)
		if err != nil {
			return "", err
		}
	} else {
		return "", errors.New(extension + " isn't implemented yet")
	}

	// Autoprefixer
	if file.Options.Autoprefixer != "" {
		logAp, err := styleAutoprefixCSS(file)
		if err != nil {
			return "", err
		}

		// Lets take care of the log
		log = log + " " + logAp
	}

	// Now we need to post process
	if file.Options.Minify {
		logMin, err := styleMinifyCSS(file)
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

// StyleScss compiles the style file
func styleScss(file StyleStruct) (log string, err error) {
	wd, _ := os.Getwd()
	src := file.Src
	dest := file.Dest

	// Change the working dir
	// Needed because of imports
	os.Chdir(path.Dir(src))
	defer os.Chdir(wd)

	// Read the file
	data, err := os.Open(src)
	if err != nil {
		return "", err
	}

	// Lets start the conversion now
	destFile, err := os.Create(dest)
	if err != nil {
		return "", err
	}

	// Decide output style
	outputStyle := 1
	if file.Options.Minify {
		outputStyle = 3
	}

	// Finally the compilation...
	comp, err := libsass.New(destFile, data,
		libsass.OutputStyle(outputStyle),
		libsass.Precision(file.Options.Precision),
		libsass.Comments(file.Options.Comments),
		libsass.IncludePaths(file.Options.IncludePaths),
		libsass.HTTPPath(file.Options.HTTPPath),
		libsass.SourceMap(file.Options.SourceMap, dest+".map"),
		libsass.BasePath(file.Options.BasePath),
	)
	// libsass.FontDir(file.Options.FontDir),
	if err != nil {
		return "", err
	}

	if err := comp.Run(); err != nil {
		return "", err
	}

	return
}

// styleMinifyCss autoprefixes the css
func styleAutoprefixCSS(file StyleStruct) (log string, err error) {
	src := file.Dest

	// Install dependencies
	NpmInstall([]string{"postcss@5.0.21", "autoprefixer@6.3.6"})

	// Lets get the paths for the script
	basePath := path.Join(CmdDir, "..")
	vendorPath := path.Join(basePath, "node_modules")
	scriptPath := path.Join(CmdDir, "external/style/autoprefix.js")

	// Now lets run the script
	log, err = RawCommand(RawStruct{
		Command: "node",
		Args:    []string{scriptPath, vendorPath, src, file.Options.Autoprefixer},
	})

	return log, err
}

// styleMinifyCss minifies the css
func styleMinifyCSS(file StyleStruct) (log string, err error) {
	src := file.Dest
	min := minify.New()
	min.AddFunc("text/css", css.Minify)

	// Get file
	fileParse, err := os.Open(src)
	if err != nil {
		return "", err
	}

	destFile, err := os.Create(src + ".tmp")
	if err != nil {
		return "", err
	}

	if err := min.Minify("text/css", destFile, fileParse); err != nil {
		return "", err
	}

	// No need for the other file
	FileRemove(FileStruct{Src: src})
	FileRename(FileStruct{Src: src + ".tmp", Dest: src})

	return
}
