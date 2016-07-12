# Bedrock: Utils > Server: Container

Module to create, run, stop and destroy docker containers.<br>

###### `[[server.container]]`
Install [Docker](https://www.docker.com/)

### Config file parameters
```toml
[server]

[[server.container]]
name = ""
type = "" # example mysql:5.6 or vredens/ln_p
port = ""
link = [""]
env_var = [""]
volume = [""]
sleep = 0 # seconds to wait on run
env = ""
cmd = ""
sys = "all"
```

### Examples
Go under the [../test/example_container](../test/example_container) folder and check the `*.toml`.
