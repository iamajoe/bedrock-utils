# Bedrock: Utils

Task system based on config files for your project. Set a `create.toml` or a `build.toml` or a `server.toml` or even a `foo.toml` and run all the tasks you want when you pass it to `bedrock-utils`.<br>

## Installation
You need to have [node](http://nodejs.org) so you can have the package dependency management and use the tasks:
- Install [node](http://nodejs.org)

To install you may use ```bower```:
```
bower install --save git@github.com:Sendoushi/bedrock-utils.git#v0.0.9
```

Or you may use ```npm```:
```
npm install --save git://github.com/Sendoushi/bedrock-utils.git#v0.0.9
```

Or why don't you just simply clone it?
```
git clone https://github.com/Sendoushi/bedrock-utils.git
```

## Usage
**Note:** Any kind of path should be absolute or relative to the `*.toml`

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
#    env = "dev|prod" # decide on which type of environment it should run, allows empty
#    cmd = "init|build|start|destroy" # decide on which bin command it should run, allows empty
#    sys = "windows|darwin|linux|freesbd|all" # decide on which system it should run
```

### Module list
- [create](docs/create.md)
- [copy](docs/file_copy.md)
- [rename](docs/file_rename.md)
- [remove](docs/file_remove.md)
- [raw](docs/raw.md)
- [sprite](docs/sprite.md)
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
