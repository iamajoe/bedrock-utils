# Bedrock: Utils > Sprite

Module to spritesheet files.<br>

### Config file parameters
```toml
[[sprite]]
source = "" # required
destination = "" # required
style = "" # required. location of the style file (extension required)
style_name = "" # name for the css rules
style_rel = "" # path of sprite relative to the style for the css rules
ignore = ""
order = 0
env = ""
cmd = ""
sys = "all"
```

### Examples
Go under the [../test/example_build](../test/example_build) folder and check the `*.toml`.
