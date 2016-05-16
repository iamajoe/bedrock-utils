# Bedrock: Utils

The idea for this repository is to have a mix of utils to use when developing a project.

=========

# Build

Just run a `*.toml` into the compiled `cmd` and the build happens.

## Config file

This repo relies on usage of `*.toml` files.
So, here is how you use them.

### Usage:
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

## Run the build

```sh
./vendor/bedrock_tasks/cmd/cmd config.toml
```

=================

# Run the project
The folder `.run` should work as an example for your. Besides `.run/tasks`, you should copy it to your project folder and link it to this cloned project. This way it will be easier to suit the needs of your project.

#### Common argument explanation

* `<name>` - Name of the project in snake case. It is required

## Tasks

#### Linux

##### Requirements
* [Docker](https://www.docker.com/)

##### CLI

```
.run/do.sh <name> init                 # Initializes project and its dependencies"
.run/do.sh <name> run                  # Run project"
.run/do.sh <name> stop                 # Stops project"
.run/do.sh <name> destroy              # Destroy dev environment data"
```

#### Windows / OSX

##### Requirements
* [Vagrant](https://www.vagrantup.com/)
* [NodeJS](http://nodejs.org/)

```
npm run start                # Initializes project and its dependencies and runs it"
npm run stop                 # Stops project"
npm run destroy              # Destroy dev environment data"
npm run vagrant-ssh          # Enters vagrant-ssh"
```

===============

## Development
TODO: ...
