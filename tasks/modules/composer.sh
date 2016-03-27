#!/bin/bash

# Check if user has module
function __has_composer {
    if hash composer 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Install module
function __install_composer {
    # Finally lets download module
    if [[ $(__has_composer) != "true" ]]; then
        # Get
        if [ ! -d ~/.bin/composer ]; then
            php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
            php -r "if (hash('SHA384', file_get_contents('composer-setup.php')) === '41e71d86b40f28e771d4bb662b997f79625196afcca95a5abf44391188c695c6c1456e16154c75a211d238cc3bc5cb47') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
            php composer-setup.php --install-dir=$HOME/.bin --filename=composer
            rm composer-setup.php
        fi
    fi
}

# Configs composer in user files
function __config_composer {
    if [ -z "$COMPOSERISSETINRC" ] && [[ $(__has_composer) == "true" ]]; then
        echo "Config Composer..."

        # Now add the export
        echo -e '\n# Composer' >> $1
        echo -e 'export COMPOSERISSETINRC="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'has')
        __has_composer
    ;;

    'config')
        __config_composer $2
    ;;

    'install')
        __install_composer $2
    ;;

    *)
        echo "Usage: $0 has|config <userrc>|install <path>"
    ;;
esac
