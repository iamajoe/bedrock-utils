#!/bin/bash

# Check if user has git
function __has_git {
    if hash git 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
function __config_git {
    if [ -z "$GITISSETINRC" ]; then
        local ignore_global

        echo "Config Git..."

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
        ignore_global=$(dirname $1)/gitignore_global
        if [ ! -f ignore_global ]; then
            touch ignore_global
            if [[ `uname` == 'Darwin' ]]; then
                echo -e '.DS_Store' >> ignore_global
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
    'has')
        __has_git
    ;;

    'config')
        __config_git $2
    ;;

    *)
        echo "Usage: $0 has|config <userrc>"
    ;;
esac
