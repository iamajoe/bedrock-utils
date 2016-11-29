# Bedrock: Utils > Scraper

## This module is highly unstable or even not working!

Module to scrape the web.
This module is very different since it isn't supposed to be in a build config. For example, `src` is an array where in most of the other modules this is supposed to be a string.

### Config file parameters
```json
{
    "type": "scrape",
    "data": [{
        "src": ["<task_url_src>"],
        "dest": "<task_dest_report_json>",
        "options": {
            "base": "<base_to_be_added_before_each_src>",
            "baseEnv": "<base_environment_variable_to_be_added_before_each_src>"
        }
    }]
}

    }]    
}
```

### Examples
Go under the [test/examples/scraper](test/examples/scraper) folder and check the `*.json`.
