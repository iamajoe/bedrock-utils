# Bedrock: Utils

Utils to use on the frontend.

## Installation
You need to have [node](http://nodejs.org) so you can have the package dependency management and use the tasks:
- Install [node](http://nodejs.org)

```
cd <project_folder>
npm init # If you don't have a package.json already
npm install --save git://github.com/Sendoushi/bedrock-utils.git#0.0.12
```

## Tasks

Set a `.build.json` and run all the tasks you want when you pass it to `bedrock-utils`.<br>
**Note:** Any kind of path should be absolute or relative to the place the script is called.

### Usage

```
node <gulp_path> --gulpfile=<bedrock_utils_gulpfile> <task> --env=<task_env> --config=<config_src>
```

#### CLI Explanation
```
node <gulp_path>
```
Pass the path to `gulp`. From example `node_modules/.bin/gulp`. You could simply use `gulp` instead if you have it globally.

```
--gulpfile=<bedrock_utils_gulpfile>
```
Set the path for the `bedrock-utils` gulpfile.It is required.

```
<task>
```
The task that you want to run from `bedrock-utils`. It is required.
For the moment these are the available ones:
- [x] `project:build`
- [x] `project:clean`
- [x] `project:copy`
- [x] `project:sprite`
- [x] `project:styleguide`
- [x] `project:style`
- [x] `project:script`

```
--env=<task_env>
```
Environment in which the task should run. It is optional.

#### Example

```sh
node ./node_modules/.bin/gulp --gulpfile="./node_modules/bedrock-utils/tasks/gulpfile.js" project:build --env=prod --config=".build.json"
```

=========

## Configure

This repo relies on usage of `*.json` config files. Below I try to explain the best I can how to.

### Config file parameters
```json
{
    "projectId": "<project_id>",
    "projectName": "<project_name>",
    "tasks": []
}
```

### Task common config
```json
{
    "tasks": [{
        "type": "<task_type>",
        "env": "<environment>",
        "data": []
    }]    
}
```
**Note: ** If `env` key is `*`, the task will run in all `env`.

### Task data common config
```json
{
    "data": [{
        "src": "<task_src_glob>",
        "dest": "<task_dest>"
    }]    
}
```

### Module list
- [clean](docs/file_clean.md)
- [copy](docs/file_copy.md)
- [sprite](docs/sprite.md)
- [styleguide](docs/styleguide.md)
- [style](docs/style.md)
- [script](docs/script.md)

### Examples
Go under the [test/examples](test/examples) folder and check the `*.json`.
