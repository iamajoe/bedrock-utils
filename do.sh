#!/bin/bash

# Gets source dirname
# @return {string}
function __get_src_dir {
    local file_src=${BASH_SOURCE[0]}
    local base

    if [ -h $file_src ]; then
        base=$(dirname $(readlink $file_src))
    else
        base=$(dirname $file_src)
    fi

    echo $base
}

# Decides tasks environment
# @param {string} env
# @return {string}
function __PROJECT_decide_env {
    local build

    # Check type of build
    if [[ $1 == 'prod' ]]; then
        build='prod'
    else
        build='dev'
    fi

    echo $build
}

# Install
function __PROJECT_install {
    echo "Install: [project]"
    echo "TODO"
}

# Build
# @param {string} env
function __PROJECT_build {
    local build=$(__PROJECT_decide_env $1)

    echo "Build: [project] [$build]"

    pushd $(__get_src_dir)/tasks
    ./do.sh run $build "$HOME/.bin"
    popd
}

# Run
# @param {string} env
function __PROJECT_run {
    local build=$(__PROJECT_decide_env $1)

    echo "Run: [project]"
    echo "TODO"
}

# Task dev
# @param {string} env
function __PROJECT_task_dev_build {
    local build=$(__PROJECT_decide_env $1)

    pushd $(__get_src_dir)/tasks
    ./do.sh build $build "$HOME/.config/userrc" "$HOME/.bin"
    popd
}

#################################
# Argument case!

set -e
case "$1" in
    'install')
        __PROJECT_install
    ;;

    'build')
        __PROJECT_build $2
    ;;

    'run')
        __PROJECT_run $2
    ;;

    'task')
        __PROJECT_task_dev_build $3
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    install                        # Install dependencies"
        echo "    build [prod]                   # Build project in env"
        echo "    run [prod]                     # Run project"
        echo "    -------------------------"
        echo "    task build [prod]              # Builds tasks to be used in build "
    ;;
esac
