#!/bin/bash

# Check if user has module
# @param {string} bin
function __COMPOSER_exist {
    if hash composer 2>/dev/null; then
        echo "true"
    elif [ -d "$1/composer" ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __COMPOSER_config {
    if [ -z "$COMPOSERISSETINRC" ] && [[ $(__COMPOSER_exist $2) == "true" ]]; then
        echo "Config: [tasks/composer]"

        # Now add the export
        echo -e '\n# Composer' >> $1
        echo -e 'export COMPOSERISSETINRC="set"' >> $1
    fi
}

# Install module
# @param {string} bin
function __COMPOSER_install {
    # Finally lets download module
    if [[ $(__COMPOSER_exist $1) != "true" ]]; then
        echo "Install: [tasks/composer]"

        # Get
        if [ ! -d "$1/composer" ]; then
            php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
            php -r "if (hash('SHA384', file_get_contents('composer-setup.php')) === '41e71d86b40f28e771d4bb662b997f79625196afcca95a5abf44391188c695c6c1456e16154c75a211d238cc3bc5cb47') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
            php composer-setup.php --install-dir="$1" --filename=composer
            rm composer-setup.php
        fi
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'has')
        __COMPOSER_exist $2
    ;;

    'config')
        __COMPOSER_config $2 $3
    ;;

    'install')
        __COMPOSER_install $2
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    exist <bin>                # Check if Composer exists in the system"
        echo "    config <userrc> <bin>      # Configs Composer"
        echo "    install <bin>              # Installs Composer"
    ;;
esac
