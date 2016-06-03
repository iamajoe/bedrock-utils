# Bedrock: Utils > Server: Container

Module to create, run, stop and destroy docker containers.<br>

###### `[[server.container]]` under `Linux`
Install [Docker](https://www.docker.com/)

###### `[[server.container]]` under `Windows` or `OSX`
Install [Vagrant](https://www.vagrantup.com/).<br/>
Also, you'll need to set these environment variables:
- `BEDROCK_VAGRANT_IP` - example: `192.168.33.11`
- `BEDROCK_VAGRANT_PUBLIC_IP` - example: `192.168.2.100`
- `BEDROCK_VAGRANT_PROJECT_PATH` - set the absolute path for the project without the last `/`
- `BEDROCK_VAGRANT_BEDROCK_PATH` - set the absolute path for the `bedrock-utils` without the last `/`<br><br>

Eventually [Docker](https://www.docker.com/) will get better in these platforms and I'll get rid of [Vagrant](https://www.vagrantup.com/) and the need for any environment variables.<br>

=========

## Configure

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
```

### Examples
Go under the [test/example_container](test/example_container) folder and check the `*.toml`.
