#!/bin/bash

# Decides tasks environment
# @param {string} env
# @return {string}
function __TASKS_decide_env {
    local build

    # Check type of build
    if [[ $1 == 'prod' ]]; then
        build='prod'
    else
        build='dev'
    fi

    echo $build
}

# Runs tasks
# @param {string} bin
# @param {string} env
function __TASKS_run {
    local build=$(__TASKS_decide_env $2)

    echo "Run: [tasks] [$build]"
    echo "TODO"
}

# Install tasks dependencies for dev
# @param {string} userrc
# @param {string} bin
function __TASKS_DEV_install {
    echo "Install: [tasks]"
    # TODO: Cargo will install these automatically

    # Check if bin exists and create it otherwise
    if [ ! -d $2 ]; then
        mkdir -p $2
    fi

    pushd ./modules
    # Install stuff
    # These will install different modules to a bin folder
    ./rust.sh install $2
    ./node.sh install $2
    ./composer.sh install $2

    # Now the configs
    # These config lines will add PATH to the provided config file
    # If you want to use ~/.zprofile , ~/.bashrc or ~/.profile comment set_user.sh line,
    # if not a new file will be included in those profiles and created if needed
    ./set_user.sh config $1 $2
    ./git.sh config $1 $2
    ./node.sh config $1 $2
    ./rust.sh config $1 $2
    ./docker.sh config $1 $2
    ./brew.sh config $1 $2
    ./composer.sh config $1 $2
    popd

    # Now resource everything
    # TODO: Sometimes, still needs to restart the terminal
    source $1

    # Make it runnable (no longer a .sh)
    # chmod a=r+w+x $1

    echo -e "\nIt is better for you to restart the terminal!"
}

# Builds tasks for dev
# @param {string} bin
# @param {string} env
function __TASKS_DEV_build {
    local build=$(__TASKS_decide_env $2)

    echo "Build tasks: [$build]"

    # Build tasks now
    ./modules/rust.sh build $1 $build
}

#################################
# Argument case!

set -e
case "$1" in
    'run')
        __TASKS_run $2 $3
    ;;

    'build')
        __TASKS_DEV_install $2 $3
        __TASKS_DEV_build $3 $4
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    run <bin> [prod]                 # Runs tasks"
        echo "    build <userrc> <bin> [prod]      # Builds tasks"
    ;;
esac
