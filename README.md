# Bedrock: Utils

Utils to use on the frontend and node.

## Installation
You need to have [node](http://nodejs.org) so you can have the package dependency management and use the tasks:
- Install [node](http://nodejs.org)

```
cd <project_folder>
npm init # If you don't have a package.json already
npm install --save git://github.com/Sendoushi/bedrock-utils.git#0.1.1
```

## Usage example

```js
var bedrockUtils = require('bedrock-utils');

// Use module
bedrockUtils.logger.log('Bedrock', 'Awesome!');
```

------------------------

### Module list and documentation
- [file](docs/file.md)
- [is](docs/is.md)
- [logger](docs/logger.md)
- [path](docs/path.md)
- [request](docs/request.md)
- [string](docs/string.md)
- [type](docs/type.md)
