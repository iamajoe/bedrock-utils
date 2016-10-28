# Bedrock: Utils > Styleguide

Module to compile styleguide into a folder.

### Config file parameters
```json
{
    "type": "styleguide",
    "data": [{
        "src": "<task_src_folder>",
        "dest": "<task_src_folder>",
        "options": {
            "layouts": ["<src_related_to_layouts_folder>"],
            "components": ["<src_related_to_components_folder>"],
            "generalLayout": "<key_in_layouts>",
            "patternLayout": "<key_in_layouts>",
            "scriptCompileOptions": {},
            "styleCompileOptions": {}
        }
    }]
}

### Examples
Go under the [../test/examples/styleguide](../test/examples/styleguide) folder and check the `*.json`.
