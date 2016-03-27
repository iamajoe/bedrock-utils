#!/bin/bash

# Check if user has module
function __has_brew {
    if hash brew 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
function __config_brew {
    if [[ `uname` == 'Darwin' ]] && [ -z "$BREWISSETINRC" ] && [[ $(__has_brew) == "true" ]]; then
        echo "Config Brew..."

        # Now add the export
        echo -e '\n# Brew' >> $1
        echo -e 'export PATH="$(brew --prefix)/bin:$PATH"' >> $1
        echo -e 'export BREWISSETINRC="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'has')
        __has_brew
    ;;

    'config')
        __config_brew $2
    ;;

    *)
        echo "Usage: $0 has|config <userrc>"
    ;;
esac
