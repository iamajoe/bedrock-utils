#!/bin/bash

# Check if user has module
# @param {string} bin
function __BREW_exist {
    if [[ `uname` != 'Darwin' ]]; then
        echo "false"
    elif hash brew 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __BREW_config {
    if [ -z "$BREWISSETINRC" ] && [[ $(__BREW_exist $2) == "true" ]]; then
        echo "Config: [tasks/brew]"

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
    'exist')
        __BREW_exist $2
    ;;

    'config')
        __BREW_config $2 $3
    ;;

    *)
        echo ""
        echo "Usage: $0 ..."
        echo ""
        echo "    exist <bin>                # Check if Brew exists in the system"
        echo "    config <userrc> <bin>      # Configs Brew"
    ;;
esac
