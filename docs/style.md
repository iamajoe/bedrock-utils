# Bedrock: Utils > Style

Module to compile style files.<br>
To use [autoprefixer](https://github.com/postcss/autoprefixer#readme) you'll need to install [Node.js](http://nodejs.org/) because it uses [PostCSS](https://github.com/postcss/postcss).

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
source_map = false
```

### Examples
Go under the [../test/example_build](../test/example_build) folder and check the `*.toml`.
