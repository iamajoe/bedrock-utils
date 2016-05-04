#!/bin/bash

# Echos error
# @return {string}
function __console_err {
    echo " "
    echo "Err: "$1
    echo " "
}

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

# Check if user has vagrant
function __VAGRANT_exist {
    if hash vagrant 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# ------------------------------------------------

# Vagrant project
# @param {string} pkg
# @param {string} action
# @param {string} arg1
# @param {string} arg2
function __VAGRANT_project {
    export VAGRANT_IP="192.168.33.11"
    export VAGRANT_PROJECT_SRC=".run/do.sh"
    export VAGRANT_PROJECT_NAME=$1

    # Vagrant needed for non linux
    if [[ $(__VAGRANT_exist) == "true" ]]; then
        set -e
        case "$2" in
            'init')
                vagrant up
            ;;

            'run')
                vagrant up
            ;;

            'copy')
                vagrant up
            ;;

            'stop')
                vagrant suspend
            ;;

            'destroy')
                vagrant destroy
                rm -rf ./.vagrant
            ;;
        esac
    else
        __console_err "You need to install Vagrant!"
    fi
}

#################################
# Argument case!

pushd $(__get_src_dir)
__VAGRANT_project $1 $2 $3 $4
popd
