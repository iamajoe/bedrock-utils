#!/bin/bash

# Check if user has module
# @param {string} bin
function __GIT_exist {
    if hash git 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __GIT_config {
    if [ -z "$GITISSETINRC" ]; then
        local ignore_global

        echo "Config: [tasks/git]"

        # Now add the export
        echo -e '\n# Git' >> $1
        if [[ `uname` == 'Darwin' ]]; then
            if [ ! -d ~/Applications/gitx ]; then
                echo -e 'alias gitx="open -a gitx"' >> $1
            elif [ ! -d /Applications/gitx ]; then
                echo -e 'alias gitx="open -a gitx"' >> $1
            fi
        elif [[ `uname` == 'Linux' ]]; then
            echo -e 'alias gitgui="git citool"' >> $1
        fi
        echo -e 'export GITISSETINRC="set"' >> $1

        # Create gitignore_global
        ignore_global="$(dirname $1)/gitignore_global"
        if [ ! -f $ignore_global ]; then
            touch $ignore_global
            if [[ `uname` == 'Darwin' ]]; then
                echo -e '.DS_Store' >> $ignore_global
            fi
        fi

        # Create gitconfig
        if [ ! -f ~/.gitconfig ]; then
            touch ~/.gitconfig
            echo -e '[user]' >> ~/.gitconfig
            echo -e '    name = <fill here>' >> ~/.gitconfig
            echo -e '    email = <fill here>' >> ~/.gitconfig
            echo -e '[core]' >> ~/.gitconfig
            echo -e '    editor = vim' >> ~/.gitconfig
            echo -e "    excludesfile = $ignore_global" >> ~/.gitconfig
            echo -e '[color]' >> ~/.gitconfig
            echo -e '    ui = auto' >> ~/.gitconfig
        fi
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'exist')
        __GIT_exist $2
    ;;

    'config')
        __GIT_config $2 $3
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    exist <bin>                # Check if Git exists in the system"
        echo "    config <userrc> <bin>      # Configs Git"
    ;;
esac
