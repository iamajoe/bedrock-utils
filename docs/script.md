# Bedrock: Utils > Script

Module to compile scripts.<br>
Install [Node.js](http://nodejs.org/) because it uses [webpack](https://webpack.github.io/)<br>
This module is pretty complicated because it tries to proxy to [webpack](https://webpack.github.io/). For general reference, you should use [webpack](https://webpack.github.io/docs/configuration.html)<br>
Follow the types on top, otherwise you will break the compiler. Whenever you need another type, you may try to string the json. For example `entry = "[\"hey\"]"` will convert into an array when in [webpack](https://webpack.github.io/).Whenever you need a simple regex you can use `regex:` like for example on `loader.test` you can set it as `test = "regex:.js?$"`<br>
For now, only `dedupe` and `webpack-fail-plugin` plugins are accepted. If you need other please issue and I'll implement it asap.<br>
`output.filename`, `output.path` and `entry` aren't supported. Use `src` and `dest` instead (although these won't work with arrays). Eventually, I'll get to this.

### Config file parameters
```toml
[[script]]
source = "" # required
destination = "" # required
ignore = ""
order = 0
env = "both"

[script.options]
minify = false
# Webpack related
context = ""
entry = "" # Just documented. Set with src instead
externals = [""]
target = ""
bail = false
profile = false
cache = false
debug = false
devtool = ""
dev_server = ""
node = ""
amd = ""
loader = ""
records_path = ""
records_input_path = ""
records_output_path = ""

[script.options.output]
filename = "" # Just documented. Set with dest instead
path = "" # Just documented. Set with dest instead
public_path = ""
chunk_filename = ""
source_map_filename = ""
devtool_module_filename_template = ""
devtool_fallback_module_filename_template = ""
devtool_line_to_line = false
hot_update_chunk_filename = ""
hot_update_main_filename = ""
jsonp_function = ""
hot_update_function = ""
pathinfo = false
library = ""
library_target = ""
umd_named_define = false
source_prefix = ""
cross_origin_loading = ""

[script.options.module]
no_parse = [""]
unknown_context_reg_exp = ""
unknown_context_critical = ""
expr_context_reg_exp = ""
expr_context_critical = false
wrapper_context_reg_exp = ""
wrapped_context_critical = false

[[script.options.module.pre_loaders]]
test = ""
exclude = ""
include = [""]
loader = ""
loaders = [""]
dependencies = [""]
query = ""

[[script.options.module.loaders]]
test = ""
exclude = ""
include = [""]
loader = ""
loaders = [""]
dependencies = [""]
query = ""

[[script.options.module.post_loaders]]
test = ""
exclude = ""
include = [""]
loader = ""
loaders = [""]
dependencies = [""]
query = ""

[script.options.resolve]
alias = [""]
root = [""]
modules_directories = [""]
fallback = [""]
extensions = [""]
package_mains = [""]
package_alias = ""
unsafe_cache = [""]

[script.options.resolve_loader]
alias = [""]
root = [""]
modules_directories = [""]
fallback = [""]
extensions = [""]
package_mains = [""]
package_alias = ""
unsafe_cache = [""]
module_templates = [""]

[[script.options.plugins]]
name = "" # dedupe and define don't need dependencies
type = "" # sometimes the plugin is a function and not a class
dependencies = [""]
```

### Examples
Go under the [../test/example_build](../test/example_build), [../test/example_es6](../test/example_es6), [../test/example_flow](../test/example_flow) or [../test/example_typescript](../test/example_typescript) folders and check the `*.toml`.
