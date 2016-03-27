#!/bin/bash

# Gets source dirname
# @return {string}
function __get_dirname {
    local file_src=${BASH_SOURCE[0]}
    local base

    if [ -h $file_src ]; then
        base=$(dirname $(readlink $file_src))
    else
        base=$(dirname $file_src)
    fi

    echo $base
}

# Install
function __install_project {
    pushd $(__get_dirname)/tasks
    ./do.sh install "$HOME/.config/userrc" "$HOME/.bin"
    popd
}

# Build
# @param {string} env
function __build_project {
    pushd $(__get_dirname)/tasks
    ./do.sh build "$HOME/.bin" $1
    popd
}

# Run
# @param {string} env
function __run_project {
    pushd $(__get_dirname)/tasks
    ./do.sh run "$HOME/.bin" $1
    popd
}

#################################
# Argument case!

set -e
case "$1" in
    'install')
        __install_project
    ;;

    'build')
        __build_project $2
    ;;

    'run')
        __run_project $2
    ;;

    *)
        echo "Usage: $0 install|build [prod]|run [prod]"
    ;;
esac
