#!/bin/bash

# Check if user has node
function __has_node {
    if hash node 2>/dev/null; then
        echo "true"
    elif [ -d ~/.bin/nvm ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Install module
function __install_node {
    # Finally lets download module
    if [[ $(__has_node) != "true" ]]; then
        # Get
        if [ ! -d ~/.bin/nvm ]; then
            git clone https://github.com/creationix/nvm.git ~/.bin/nvm

            pushd ~/.bin/nvm
            git checkout `git describe --abbrev=0 --tags`
            source nvm.sh
            popd
        fi

        # Lets install the right node
        nvm install 5.0
        nvm use 5.0
    fi
}

# Configs node in user files
function __config_node {
    if [ -z "$NODEISSETINRC" ] && [[ $(__has_node) == "true" ]]; then
        echo "Config NODE.js..."

        # Set npm file
        # TODO: Provide this to nvm
        # touch ~/.config/npmrc
        # echo -e "email=$2" >> ~/.config/npmrc

        # Now add the export
        echo -e '\n# NODE.js' >> $1
        echo -e 'export PATH=~/.bin/npm/bin:$PATH' >> $1
        echo -e 'export NVM_DIR="$HOME/.bin/nvm"' >> $1
        echo -e '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> $1
        echo -e 'export NODEISSETINRC="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'has')
        __has_node
    ;;

    'config')
        __config_node $2
    ;;

    'install')
        __install_node $2
    ;;

    *)
        echo "Usage: $0 has|config <userrc>|install <path>"
    ;;
esac
