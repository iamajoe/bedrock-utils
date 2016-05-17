# Bedrock: Utils

The idea for this repository is to have a mix of utils to use when developing a project.
**Note:** Any kind of path should be absolute or relative to the `*.toml`

## Usage
```
./cmd/cmd ...
    init <*.toml>               # Initializes project"))
    build <*.toml> [env]        # Builds project"))
    run <*.toml>                # Run project"))
    stop <*.toml>               # Stop server"))
    destroy <*.toml>            # Destroy server related"))
```

### Example

```sh
# To build the project
./cmd/cmd build build.toml

# To run the project
./cmd/cmd init server.toml
./cmd/cmd run server.toml

# To remove server
./cmd/cmd stop server.toml
./cmd/cmd destroy server.toml
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
font_dir = ""
base_path = ""
min_ie = ""

# Compile script files
[[script]]
source = "" # required
destination = "" # required
ignore = ""
order = 0
env = "both"

[script.options]
target = ""
resolve_loader_root = ""
resolve_root = ""
resolve_extensions = [""]
resolve_modules_directories = [""]
devtool = ""
cache = ""
watch = ""
debug = ""
bail = false

[[script.options.module_loaders]]
test = ""
loader = ""
query_cache_directory = ""
query_presets = [""]
include = ""
exclude = ""

# Sets up a server
[server]

[server.php]
public = "" # folder path
port = 8000

[[server.container]]
name = ""
port = 0 # defaults to the type default
sleep = 0 # seconds to wait before continuing

[server.container.mysql]
root_password = ""
database = ""
user = ""
password = ""
initial = "" # file path. used essentially for DBs
mock = "" # file path. used essentially for DBs

[server.container.nginx]
public = "" # folder path

[server.container.vredens_ln_p]
public = "" # folder path
logs = "" # folder path
link = "" # it could for example: "tmp-mysql:myqsl"

[server.container.redmine]
root_password = ""
database = ""
```

#### Module notes / requirements
##### Style
To use [autoprefixer](https://github.com/postcss/autoprefixer#readme) you'll need to install [Node.js](http://nodejs.org/) because it uses [PostCSS](https://github.com/postcss/postcss)

##### Script
Install [Node.js](http://nodejs.org/) because it uses [webpack](https://webpack.github.io/)

##### Server
###### `[server.php]`
Install [PHP](http://php.net/)

###### `[[server.container]]` under `Linux`
Install [Docker](https://www.docker.com/)

###### `[[server.container]]` under `Windows` or `OSX`
Install [Vagrant](https://www.vagrantup.com/).<br/>
Also, you'll need to set two environment variables:
- `BEDROCK_VAGRANT_IP` - example: `192.168.33.11`
- `BEDROCK_VAGRANT_PUBLIC_IP` - example: `192.168.2.100`

### Example: 
```toml
max_order = 2

[[copy]]
source = "**/*.scss"
destination = "tmp/foo" # to a file with other name

[[copy]]
source = "**/*.scss"
destination = "tmp/bar/" # to a folder

[[copy]]
source = "**/*.css"
destination = "tmp/foobar/"
order = 1

[[style]]
source = "tmp.scss"
destination = "tmp/tmp.css"
env = "dev"

[style.options]
comments = true
source_map = true

[[style]]
source = "tmp.scss"
destination = "tmp/tmp.css"
env = "prod"

[style.options]
minify = true
autoprefixer = "last 2 versions, IE 11"

[[script]]
source = "tmp.js"
destination = "tmp/"
[script.options]
target = "web"
devtool = "source-map"
debug = "true"
bail = true

[[remove]]
source = "tmp/*"
ignore = "**/.gitkeep"
order = 2

[[raw]]
command = "echo"
args = ["-n", "Foo", "bar"]
order = 2
```

===============

## Development
TODO: ...
