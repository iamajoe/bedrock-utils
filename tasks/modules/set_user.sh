#!/bin/bash

# Set sources in user files
# @param {string} profile_file
# @param {string} userrc
function __USER_set_source {
    if [ -f $1 ]; then
        echo -e '\n##############' >> $1
        echo -e '# User custom \n' >> $1
        echo -e "if [ -z \"$USERRCSET\" ] && [ -f $1 ]; then" >> $1
        echo -e "  . $2" >> $1
        echo -e 'fi' >> $1
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __USER_config {
    if [ -z "$USERRCSET" ]; then
        echo "Config: [tasks/set_user]"

        # Set the config folder
        if [ ! -d $(dirname $1) ]; then
            mkdir -p $(dirname $1)
        fi

        if [ ! -f $1 ]; then
            touch $1
        fi

        # Lets add the source
        if [[ "~/.zshrc" != "$1" ]] && [[ "$HOME/.zshrc" != "$1" ]]; then
            __USER_set_source ~/.zshrc $1
        elif [[ "~/.bashrc" != "$1" ]] && [[ "$HOME/.bashrc" != "$1" ]]; then
            __USER_set_source ~/.bashrc $1
        elif [[ "~/.profile" != "$1" ]] && [[ "$HOME/.profile" != "$1" ]]; then
            __USER_set_source ~/.profile $1
        else
            __USER_set_source ~/.zshrc $1
            __USER_set_source ~/.bashrc $1
            __USER_set_source ~/.profile $1
        fi

        # Set the user file
        echo -e '\n##############' >> $1
        echo -e '# Common\n' >> $1
        echo -e "export PATH=\"/usr/local/bin:/usr/local/sbin:$2:$PATH\"" >> $1

        echo -e '\n##############' >> $1
        echo -e '# Dev\n' >> $1
        echo -e 'export USERRCSET="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'config')
        __USER_config $2 $3
    ;;

    *)
        echo ""
        echo "Usage: $0 ..."
        echo ""
        echo "    config <userrc> <bin>      # Configs user"
    ;;
esac
