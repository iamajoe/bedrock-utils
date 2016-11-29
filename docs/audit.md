# Bedrock: Utils > Audit

Module to audit the web.
This module is very different since it isn't supposed to be in a build config. For example, `src` is an array where in most of the other modules this is supposed to be a string.

### Config file parameters
```json
{
    "type": "audit",
    "data": [{
        "src": ["<task_url_src>"],
        "dest": "<task_dest_report_json>",
        "options": {
            "base": "<base_to_be_added_before_each_src>",
            "baseEnv": "<base_environment_variable_to_be_added_before_each_src>",
            "defaults": ["w3", "SEO"],
            "custom": ["<custom_audit_src>"]
        }
    }]
}
```

#### Available defaults

- [x] `w3`
- [x] `SEO`
- [x] `lighthouse`
- [ ] `eslint`
- [ ] `stylelint`

### Examples
Go under the [test/examples/audit](test/examples/audit) folder and check the `*.json`.
