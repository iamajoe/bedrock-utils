#!/bin/bash

# Check if user has module
# @param {string} bin
function __NODE_exist {
    if hash node 2>/dev/null; then
        echo "true"
    elif [ -d "$1/nvm" ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __NODE_config {
    if [ -z "$NODEISSETINRC" ] && [[ $(__NODE_exist $2) == "true" ]]; then
        echo "Config: [tasks/node]"

        # Set npm file
        # TODO: Provide this to nvm
        # touch ~/.config/npmrc
        # echo -e "email=$2" >> ~/.config/npmrc

        # Now add the export
        echo -e '\n# NODE.js' >> $1
        echo -e "export NVM_DIR=\"$2/nvm\"" >> $1
        echo -e '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> $1
        echo -e "export PATH=\"$NVM_DIR/versions/node/*/bin:$PATH\"" >> $1
        echo -e 'export NODEISSETINRC="set"' >> $1
    fi
}

# Install module
# @param {string} bin
function __NODE_install {
    # Finally lets download module
    if [[ $(__NODE_exist $1) != "true" ]]; then
        # Get
        if [ ! -d "$1/nvm" ]; then
            echo "Install: [tasks/node]"

            git clone https://github.com/creationix/nvm.git "$1/nvm"

            pushd "$1/nvm"
            git checkout `git describe --abbrev=0 --tags`
            source nvm.sh
            popd
        fi

        # Lets install the right node
        nvm install 5.0
        nvm use 5.0
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'exist')
        __NODE_exist $2
    ;;

    'config')
        __NODE_config $2 $3
    ;;

    'install')
        __NODE_install $2
    ;;

    *)
        echo ""
        echo "Usage: $0 ..."
        echo ""
        echo "    exist <bin>                # Check if Node exists in the system"
        echo "    config <userrc> <bin>      # Configs Node"
        echo "    install <bin>              # Installs Node"
    ;;
esac
