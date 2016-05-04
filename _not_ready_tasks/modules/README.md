# Bedrock Frontend Utils: Tasks/Modules

At the moment the repo provides a set of modules for the tasks.

* Set user (this will set the user configurations) 
* [Brew](http://brew.sh/) - Package manager for Mac
* [Composer](https://getcomposer.org/) - Dependency manager for PHP
* [Docker](https://www.docker.com/) - Container management
* [Git](https://git-scm.com/) - Version control management
* [Node](https://nodejs.org) - Javascript runtime
* [Rust](https://www.rust-lang.org/) - Systems programming language

#### Common argument explanation

* `<userrc>` - Config file like `.bashrc`
* `<bin>` - Folder where all bin go
* `<prod|dev>` - Environment

## CLI

### Set user
As `<userrc>`, you should use something like `.config/userrc` to keep your home directory more organized.
If `<userrc>` doesn't exist it will be created and sourced in common files (`.bashrc`, `.profile` and `.zshrc`).

```
./set_user.sh config <userrc> <bin>       # Configs user"
```

### Brew
This will only work in Mac.
Eventually this would also have an install command.

```
./brew.sh exist <bin>                     # Check if module is installed"
./brew.sh config <userrc> <bin>           # Configs module to a user rc"
```

### Composer
You'll need `php`.

```
./composer.sh exist <bin>                 # Check if module is installed"
./composer.sh config <userrc> <bin>       # Configs module to a user rc"
./composer.sh install <bin>               # Installs module in bin"
```

### Docker
Eventually this would also have an install command.

```
./docker.sh exist <bin>                 # Check if module is installed"
./docker.sh config <userrc> <bin>       # Configs module to a user rc"
```

### Git
Eventually this would also have an install command.

```
./git.sh exist <bin>                 # Check if module is installed"
./git.sh config <userrc> <bin>       # Configs module to a user rc"
```

### Node

```
./node.sh exist <bin>                 # Check if module is installed"
./node.sh config <userrc> <bin>       # Configs module to a user rc"
./node.sh install <bin>               # Installs module in bin"
```

### Rust

```
./rust.sh exist <bin>                 # Check if module is installed"
./rust.sh config <userrc> <bin>       # Configs module to a user rc"
./rust.sh install <bin>               # Installs module in bin"
./rust.sh build <prod|dev> <bin>      # Builds module project in env"
```
