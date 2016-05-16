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

# Gets the public folder
# @return {string}
function __PROJECT_get_public_folder {
    local public="../../"

    # In case is running under vagrant
    if [ -d /vagrant_project_data ]; then
        public=/vagrant_project_data
    else
        if [ ! -f $(pwd)/public_ln ]; then
            if [ ! -d $(pwd)/public_ln ]; then
                ln -s $public $(pwd)/public_ln
            fi
        fi

        public=$(pwd)/public_ln
    fi

    echo $public
}

# ------------------------------------------------

# Run
# @param {string} pkg
function __PROJECT_run {
    local public=$(__PROJECT_get_public_folder)

    echo "Run: [project]"

    # TODO: Run whatever you need to run

    # Take care of running mysql
    # ./tasks/docker.sh $1 run "mysql" $build

    echo "=================================="
    docker ps -a
    echo "=================================="

    # Get the ips
    # ./tasks/docker.sh $1 get-ip "mysql"
}

# Stop
# @param {string} pkg
function __PROJECT_stop {
    echo "Stop: [project]"

    # ./tasks/docker.sh $1 stop "mysql"
}

# Destroy
# @param {string} pkg
function __PROJECT_destroy {
    echo "Destroy: [project]"

    ./tasks/docker.sh $1 destroy-all
}

# Init
# @param {string} pkg
function __PROJECT_init {
    local public=$(__PROJECT_get_public_folder)

    echo "Init: [project]"

    # Create the mysql DB
    # ./tasks/docker.sh $1 create "mysql"
}

# Run under linux
# @param {string} pkg
# @param {string} action
# @param {string} arg1
# @param {string} arg2
function __PROJECT {
    set -e
    case "$2" in
        'init')
            __PROJECT_init $1
        ;;

        'run')
            __PROJECT_run $1
        ;;

        'stop')
            __PROJECT_stop $1
        ;;

        'destroy')
            __PROJECT_destroy $1
        ;;

        *)
            echo " "
            echo "Usage: ./do.sh ..."
            echo " "
            echo "    <pkg_name> init                    # Initializes project"
            echo "    <pkg_name> run                     # Run project"
            echo "    <pkg_name> stop                    # Stop servers and containers"
            echo "    <pkg_name> destroy                 # Destroy servers and containers"
            echo " "
        ;;
    esac
}

#################################
# Argument case!

pushd $(__get_src_dir)

echo " "
echo "#####################################"
echo "# Project: [$1][$2]"
echo " "

if [[ `uname` != 'Linux' ]]; then
    # Non-linux needs vagrant to run docker
    ./tasks/vagrant.sh $1 $2 $3 $4 $5 $6
else
    __PROJECT $1 $2 $3 $4
fi
popd
