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
#### Max of task order 
You should set the minimum here for better performance
```toml
max_order = 30 # defaults to 30
```

#### Modules:
##### Usage (with defaults):
```toml
[[<name>]]
source = ""
destination = ""
ignore = ""
order = 0
env = "both"
sys = "all"

# In case of server module, it can't be an array so you should use:
[server]
...
```

###### Source file / glob:
```toml
source = "<path>"
```

###### Destination file where file has other name:
```toml
destination = "<path>"
```

###### Destination folder where file has same name:
```toml
destination = "<path>/"
```

###### Ignore specific file / folder / glob:
```toml
ignore = "<path>"
```

###### Order in which the command should happen:
```toml
order = 0
```

###### Decide type of environment:
```toml
env = "dev|prod|both"
```

###### Decide type of system:
```toml
sys = "windows|darwin|linux|freesbd|all"
```

##### Modules available:
**Name:** copy<br/>
**Description:** Copy files/directories<br/>

**Name:** rename<br/>
**Description:** Rename files/directories<br/>

**Name:** remove<br/>
**Description:** Remove files/directories<br/>

**Name:** raw<br/>
**Description:** Perform raw commands<br/>
**Usage:**
```toml
[[raw]]
command = ""
args = [""]
order = 0
env = "both"
sys = "all"
```

**Name:** style<br/>
**Description:** Compile style files. Use `[style.options]` to pass options<br/>
**Usage:**
```toml
[[style]]
source = ""
destination = ""
ignore = ""
order = 0
env = "both"
[style.options]
minify = false
autoprefixer = ""
pixrem = false
precision = 0
comments = true
include_paths = [""]
http_path = ""
source_map = true
font_dir = ""
base_path = ""
min_ie = ""
```
**Note:** To use `autoprefixer` or `pixrem` you'll need to install [Node.js](http://nodejs.org/) because it uses [PostCSS](https://github.com/postcss/postcss)<br/>

**Name:** script<br/>
**Description:** Compile script files. Use `[script.options]` to pass options<br/>
**Usage:**
```toml
[[script]]
source = ""
destination = ""
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
```
**Note:** To use `[[script]]` you'll need to install [Node.js](http://nodejs.org/) because it uses [webpack](https://webpack.github.io/)<br/>

**Name:** server<br/>
**Description:** Sets up a server. Use `[[server.container]` to pass each container<br/>
**Usage:**
```toml
[server]
vagrant_ip = "192.168.33.11"
vagrant_public_ip = "192.168.2.100"
[[server.container]]
name = "foo_mysql"
type = "mysql"
initial_db = "/foo/bar"
mock_db = "/foo/bar"
port = 3306
sleep = 30
[[server.container]]
name = "foo_nginx"
type = "nginx"
port = 8000
[[server.container]]
name = "foo_redmine"
type = "redmine"

```
**Note:** To use `[server]`, if you're on `Linux`, install [Docker](https://www.docker.com/), if you're on `Windows` or `OSX`, install [Vagrant](https://www.vagrantup.com/)<br/>

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
env = "env"
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
pixrem = true

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
