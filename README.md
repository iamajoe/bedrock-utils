# NOTE: Deprecated

==========

# Bedrock: Utils

Utils to use on the frontend and node.

[![Build Status](https://travis-ci.org/Sendoushi/bedrock-utils.svg?branch=master)](https://travis-ci.org/Sendoushi/bedrock-utils)

**Note**

For those who don't want to use [ES6](http://es6-features.org/) you can still use this package by using the files inside the [dist](dist) folder.

**Note 2**

All is tested by exporting a `__test__` with all the functions within a module file. This way tests can access the private methods and variables.
These should be removed with for example [babel-plugin-remove-code](https://github.com/sendoushi/babel-plugin-remove-code). It is already removed by default in the [dist](dist) folder.

## Installation
You need to have [node](http://nodejs.org) so you can have the package dependency management and use the tasks:
- Install [node](http://nodejs.org)

```
cd <project_folder>
npm init # If you don't have a package.json already
npm install --save git://github.com/Sendoushi/bedrock-utils.git#0.1.3
```

------------------------

### Module list and documentation
- [file](docs/file.md)
- [path](docs/path.md)
- [validate](docs/validate.md)
