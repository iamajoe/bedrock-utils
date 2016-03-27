#!/bin/bash

# Install
# @param {string} userrc
# @param {string} bin
function __install_project {
    echo "Installing dependencies..."
    # TODO: Cargo will install these automatically

    if [ ! -d $2 ]; then
        mkdir $2
    fi

    pushd modules
    # Install stuff
    ./rust.sh install $2
    ./node.sh install $2
    ./composer.sh install $2

    # Now the configs
    ./set_user.sh config $1 $2
    ./git.sh config $1 $2
    ./node.sh config $1 $2
    ./rust.sh config $1 $2
    ./docker.sh config $1 $2
    ./brew.sh config $1 $2
    ./composer.sh config $1 $2
    popd

    # Now resource everything
    source $1

    # Make it runnable (no longer a .sh)
    # chmod a=r+w+x $1

    echo -e "\nIt is better for you to restart the terminal!"
}

# Build
# @param {string} bin
# @param {string} env
function __build_project {
    local build

    # Check type of build
    if [[ $2 == 'prod' ]]; then
        build='prod'
    else
        build='dev'
    fi

    echo "Building $build..."

    # Build rust
    modules/rust.sh build $1 $build
}

# Run
# @param {string} bin
# @param {string} env
function __run_project {
    local build

    # Check type of build
    if [[ $2 == 'prod' ]]; then
        build='prod'
    else
        build='dev'
    fi

    echo "Running $build..."

    # Run rust
    modules/rust.sh run $1 $build
}

#################################
# Argument case!

set -e
case "$1" in
    'install')
        __install_project $2 $3
    ;;

    'build')
        __build_project $2 $3
    ;;

    'run')
        __run_project $2 $3
    ;;

    *)
        echo "Usage: $0 install <userrc> <bin>|build <bin> [prod]|run <bin> [prod]"
    ;;
esac
