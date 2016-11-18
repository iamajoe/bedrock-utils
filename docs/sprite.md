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
            "style": "<path_for_built_style>",
            "preview": "<false||true>",
            "mode": "<defs||symbols>",
            "baseSize": "<font_size_icon>",
            "selector": "<css_selector_example:icon-%f>",
            "svgId": "<css_id_example:svg-%f>"
        }
    }]
}
```

### Examples
Go under the [../test/examples/sprite](test/examples/sprite) folder and check the `*.json`.
