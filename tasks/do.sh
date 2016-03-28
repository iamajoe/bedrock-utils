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

# Runs tasks
# @param {string} env
# @param {string} bin
function __TASKS_run {
    local bin="debug"

    if [[ $1 == 'prod' ]]; then
        bin="release"
    fi

    echo "Run: [tasks] [$1]"

    # Run tasks now
    # TODO: Remove this, only here for test purposes
    ./src/test/target/$bin/main
    # ./src/minify/$bin/main
}

# Install tasks dependencies for dev
# @param {string} bin
# @param {string} userrc
function __TASKS_DEV_install {
    echo "Install: [tasks]"
    # TODO: Cargo will install these automatically

    # Check if bin exists and create it otherwise
    if [ ! -d $1 ]; then
        mkdir -p $1
    fi

    # Install stuff
    # These will install different modules to a bin folder
    ./modules/rust.sh install $1
    ./modules/node.sh install $1
    ./modules/composer.sh install $1

    # Now the configs
    # These config lines will add PATH to the provided config file
    # If you want to use ~/.zprofile , ~/.bashrc or ~/.profile comment set_user.sh line,
    # if not a new file will be included in those profiles and created if needed
    ./modules/set_user.sh config $2 $1
    ./modules/git.sh config $2 $1
    ./modules/node.sh config $2 $1
    ./modules/rust.sh config $2 $1
    ./modules/docker.sh config $2 $1
    ./modules/brew.sh config $2 $1
    ./modules/composer.sh config $2 $1

    # Reload config source file
    source $2

    # Make it runnable (no longer a .sh)
    # chmod a=r+w+x $1
}

# Builds tasks for dev
# @param {string} env
# @param {string} bin
function __TASKS_DEV_build {
    local rust_sh="../../modules/rust.sh"
    local build=$(__get_src_dir)"/build.json"

    echo "Build: [tasks] [$1]"
    echo $build

    # Build tasks now
    # pushd ./src/test
    # $rust_sh build $1 $2 $build
    # popd
    # pushd ./src/minifyjs
    # $rust_sh build $1 $2
    # popd
}

#################################
# Argument case!

set -e
case "$1" in
    'run')
        __TASKS_run $2 $3
    ;;

    'build')
        __TASKS_DEV_install $4 $3
        __TASKS_DEV_build $2 $4
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    run <prod|dev> <bin>                 # Runs tasks"
        echo "    build <prod|dev> <userrc> <bin>      # Builds tasks"
    ;;
esac
