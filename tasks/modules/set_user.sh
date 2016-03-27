#!/bin/bash

# Set sources in user files
# @param {string} profile_file
# @param {string} userrc
function _set_user_source {
    if [ -f $1 ]; then
        echo -e '\n##############' >> $1
        echo -e '# User custom \n' >> $1
        echo -e 'if [ -z "$USERRCSET" ] && [ -f $1 ]; then' >> $1
        echo -e "  . $2" >> $1
        echo -e 'fi' >> $1
    fi
}

# Configs module in user files for dev
# @param {string} userrc
# @param {string} bin
function __config_user_dev {
    if [ -z "$USERRCDEVSET" ]; then
        echo -e '\n##############' >> $1
        echo -e '# Dev\n' >> $1
        echo -e "export PATH=\"$2:$PATH\"" >> $1
        echo -e 'export USERRCDEVSET="set"' >> $1
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __config_user {
    if [ -z "$USERRCSET" ]; then
        echo "Config User..."

        # Set the config folder
        if [ ! -d ~/.config ]; then
            mkdir .config
        fi

        if [ ! -f $1 ]; then
            touch $1
        fi

        # Lets add the source
        _set_user_source ~/.zshrc $1
        _set_user_source ~/.bashrc $1
        _set_user_source ~/.profile $1

        # Set the user file
        echo -e '\n##############' >> $1
        echo -e '# Common\n' >> $1

        echo -e 'export PATH="/usr/local/bin:/usr/local/sbin:$PATH"' >> $1
        echo -e 'export USERRCSET="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'config')
        __config_user $2 $3
        __config_user_dev $2 $3
    ;;

    *)
        echo "Usage: $0 config <userrc> <bin>"
    ;;
esac
