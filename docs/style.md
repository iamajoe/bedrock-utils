# Bedrock: Utils > Style

Module to compile style files.<br>
Check [autoprefixer](https://github.com/postcss/autoprefixer#readme) options if you want to use it.

### Config file parameters
```json
{
    "type": "style",
    "data": [{
        "src": "<task_src_glob>",
        "dest": "<task_dest>",
        "options": {
            "minify": true,
            "autoprefixer": ["last 2 versions"],
            "sourceMap": false,
            "include": []
        }
    }]
}
```

### Examples
Go under the [test/examples/style](test/examples/style) folder and check the `*.json`.
