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
# @param {string} action
# @param {string} name
# @param {string} type / sleep
# @param {string} port
# @param {string} env_var
# @param {string} volume
function __VAGRANT_project {
    # export BEDROCK_VAGRANT_IP=...
    # export BEDROCK_VAGRANT_PUBLIC_IP=...
    # export BEDROCK_VAGRANT_BASE_PATH=...
    # export BEDROCK_VAGRANT_BEDROCK_PATH=...

    set -e
    case "$1" in
        'create')
            vagrant up
            vagrant ssh -c "project_do $1 $2 $3 $4 $6"
        ;;

        'run')
            vagrant up
            vagrant ssh -c "project_do $1 $2 $3"
        ;;

        'stop')
            vagrant suspend
        ;;

        'destroy')
            vagrant destroy
            rm -rf ./.vagrant
        ;;
    esac
}

#################################
# Argument case!

pushd $(__get_src_dir)

if [[ $(__VAGRANT_exist) == "true" ]]; then
    __VAGRANT_project $1 $2 $3 $4 $5 $6
else
    __console_err "You need to install Vagrant!"
fi

popd
