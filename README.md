# Bedrock: Utils

The idea for this repository is to have a mix of utils to use when developing a project.<br>
**Note:** Any kind of path should be absolute or relative to the `*.toml`<br>

## Install
Select the compressed file related to your platform under [bin](bin), download it and extract it under your project.

## Usage
```
./bedrock-utils/bedrock ...
    init <*.toml>               # Initializes project"
    build <*.toml> [env]        # Builds project"
    run <*.toml>                # Run project"
    stop <*.toml>               # Stop server"
    destroy <*.toml>            # Destroy server related"
```

### Example

```sh
# To build the project
./bedrock-utils/bedrock build build.toml

# To run the project
./bedrock-utils/bedrock init server.toml
./bedrock-utils/bedrock run server.toml

# To remove server
./bedrock-utils/bedrock stop server.toml
./bedrock-utils/bedrock destroy server.toml
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
```

### Module list
- [create](docs/create.md)
- [copy](docs/file_copy.md)
- [rename](docs/file_rename.md)
- [remove](docs/file_remove.md)
- [raw](docs/raw.md)
- [script](docs/script.md)
- [style](docs/style.md)
- [server.container](docs/server_container.md)
- [server.php](docs/server_php.md)

### Examples
Go under the [test](test) folder and check the `*.toml` under the `example_*` folders.

===============

## Development
- Clone the project
- Run `npm run build` (or if you don't want to use [Node.js](http://nodejs.org/), check the script under the `package.json`)
