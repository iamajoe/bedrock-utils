# Bedrock: Utils > Create

Module to create a project. This module can only be used under `init`.<br>
For now, the best way to understand what templates are available is for you to go to the [create folder](bin/external/create) and check each folder.

=========

## Configure

### Config file parameters
```toml
[[create]]
destination = "" # required. it doesn't support globs
type = "" # basic, php_jquery, redux_react, slim_twig or style
ignore = ""
order = 0
env = "both"
```

### Examples
Go under the [test/example_create](test/example_create) folder and check the `*.toml`.
