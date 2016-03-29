# Bedrock Frontend Utils

The idea for this repository is to have a mix of utils to use in frontend environment.

#### Common argument explanation

* `[prod]` - Environment. Default will be set to `dev`

## Tasks

These are tasks related to the project.

```
./do.sh install                        # Install dependencies"
./do.sh build [prod]                   # Build project in env"
./do.sh run [prod]                     # Run project in env"
```

#### Tasks dev

This will build the tasks but it will also install a new set of depencies like for example node and rust.

```
./do.sh task build [prod]              # Builds tasks to be used in build "
```
