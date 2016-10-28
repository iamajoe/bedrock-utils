# Bedrock: Utils > Sprite

Module to spritesheet files.<br>

### Config file parameters
```json
{
    "type": "sprite",
    "data": [{
        "src": "<task_src_glob>.png",
        "dest": "<task_dest>",
        "options": {
            "style": "<path_for_built_style>",
            "styleTemplate": "<path_for_style_handlebars_template>"
        }
    }, {
        "src": "<task_src_glob>.svg",
        "dest": "<task_dest>",
        "options": {
            "style": "<path_for_built_style>"
        }
    }]
}
```

### Examples
Go under the [../test/example/sprite](../test/example/sprite) folder and check the `*.json`.
