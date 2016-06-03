# Bedrock: Utils > Style

Module to compile style files.<br>
To use [autoprefixer](https://github.com/postcss/autoprefixer#readme) you'll need to install [Node.js](http://nodejs.org/) because it uses [PostCSS](https://github.com/postcss/postcss).<br>
For now, this module needs to be on an order of its own or with a `script`. Trying to solve that.<br>

=========

## Configure

### Config file parameters
```toml
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
```

### Examples
Go under the [test/example_build](test/example_build) folder and check the `*.toml`.
