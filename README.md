# Bedrock: Utils

The idea for this repository is to have a mix of utils to use when developing a project.<br>
**Note:** Any kind of path should be absolute or relative to the `*.toml`<br>
**Note 2:** Eventually, I'll get this module cross compiled as for the moment select the right file for your OS in the bin

## Usage
```
./bin/bedrock ...
    init <*.toml>               # Initializes project"
    build <*.toml> [env]        # Builds project"
    run <*.toml>                # Run project"
    stop <*.toml>               # Stop server"
    destroy <*.toml>            # Destroy server related"
```

### Example

```sh
# To build the project
./bin/bedrock build build.toml

# To run the project
./bin/bedrock init server.toml
./bin/bedrock run server.toml

# To remove server
./bin/bedrock stop server.toml
./bin/bedrock destroy server.toml
```

=========

## Configure

This repo relies on usage of `*.toml` files. Below I try to explain the best I can how to.

### Config file parameters
```toml
max_order = 30 # defaults to 30. set the minimum here for better performance

# General explanation of modules parameters:
#    [[<name>]] or [<name>]
#    order = 0 # order in which the module should run
#    env = "dev|prod|both" # decide on which type of environment it should run
#    sys = "windows|darwin|linux|freesbd|all" # decide on which system it should run

# Modules parameters with defaults:
# Copy file / folder / glob
[[copy]]
source = "" # required
destination = "" # required
ignore = ""
order = 0
env = "dev"
sys = "all"

# Rename file / folder
[[rename]]
source = "" # required
destination = "" # required
ignore = ""
order = 0
env = "dev"
sys = "all"

# Remove file / folder / glob
[[remove]]
source = "" # required
ignore = ""
order = 0
env = "dev"
sys = "all"

# Perform raw commands
[[raw]]
command = "" # required
args = [""]
order = 0
env = "both"
sys = "all"

# Compile style files
[[style]]
source = "" # required
destination = "" # required
ignore = ""
order = 0
env = "both"

[style.options]
minify = false
autoprefixer = ""
precision = 0
comments = true
include_paths = [""]
http_path = ""
source_map = true
base_path = ""

# Compile script files
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

[script.options.module.pre_loaders.query]
cache_directory = false
presets = [""]

[[script.options.module.loaders]]
test = ""
exclude = ""
include = [""]
loader = ""
loaders = [""]
dependencies = [""]

[script.options.module.loaders.query]
cache_directory = false
presets = [""]

[[script.options.module.post_loaders]]
test = ""
exclude = ""
include = [""]
loader = ""
loaders = [""]
dependencies = [""]

[script.options.module.post_loaders.query]
cache_directory = false
presets = [""]

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

[script.options.plugins]
dedupe = false
node_env = ""

# Sets up a server
[server]

[[server.php]]
public = "" # folder path
port = 8000

[[server.container]]
name = ""
type = "" # example mysql:5.6 or vredens/ln_p
port = ""
link = [""]
env_var = [""]
volume = [""]
sleep = 0 # seconds to wait on run
```

#### Module notes / requirements
##### Style
To use [autoprefixer](https://github.com/postcss/autoprefixer#readme) you'll need to install [Node.js](http://nodejs.org/) because it uses [PostCSS](https://github.com/postcss/postcss).<br>
For now, this module needs to be on an order of its own or with a `script`. Trying to solve that.

##### Script
Install [Node.js](http://nodejs.org/) because it uses [webpack](https://webpack.github.io/)<br>
This module is pretty complicated because it tries to proxy to [webpack](https://webpack.github.io/). For general reference, you should use [webpack](https://webpack.github.io/docs/configuration.html)<br>
Follow the types on top, otherwise you will break the compiler. Whenever you need another type, you may try to string the json. For example `entry = "['hey']"` will convert into an array when in [webpack](https://webpack.github.io/).Whenever you need a simple regex you can use `regex:` like for example on `loader.test` you can set it as `test = "regex:.js?$"`<br>
For now, only `dedupe` plugin is accepted. If you need other please issue and I'll implement it asap.<br>
`output.filename`, `output.path` and `entry` aren't supported. Use `src` and `dest` instead (although these won't work with arrays). Eventually, I'll get to this.

##### Server

Containers are on the TODO list but not yet implemented

###### `[server.php]`
Install [PHP](http://php.net/)

###### `[[server.container]]` under `Linux`
Install [Docker](https://www.docker.com/)

###### `[[server.container]]` under `Windows` or `OSX`
Install [Vagrant](https://www.vagrantup.com/).<br/>
Also, you'll need to set two environment variables:
- `BEDROCK_VAGRANT_IP` - example: `192.168.33.11`
- `BEDROCK_VAGRANT_PUBLIC_IP` - example: `192.168.2.100`

### Examples
Go under the [test](test) folder and check the `*.toml`.

===============

## Development
TODO: ...
