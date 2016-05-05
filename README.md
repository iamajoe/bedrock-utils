# Bedrock Utils

The idea for this repository is to have a mix of utils to use when developing a project.

#### Common argument explanation

* `<name>` - Name of the project in snake case. It is required
* `[prod]` - Environment. Default will be set to `dev`

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
