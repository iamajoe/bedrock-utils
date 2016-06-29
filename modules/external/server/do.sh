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

# Check if user has docker
function __DOCKER_exist {
    if hash docker 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# ------------------------------------------------

# Container create
# @param {string} name
# @param {string} type
# @param {string} port
# @param {string} args
function __container_create {
    if ! docker ps -a | grep -q $1; then
        echo "Creating a new $1 docker container"

        # Create the docker container
        docker create --name $1 -p $3 "${@:4}" $2

        # Just wait some seconds
        sleep 3
    fi
}

# Container run
# @param {string} name
# @param {string} sleep
function __container_run {
    if docker ps -a | grep -q $1; then
        echo "Starting the $1 docker container"
        docker start $1

        echo "Waiting $2 seconds for $1 to boot"
        sleep $2
    fi
}

# Container stop
# @param {string} name
function __container_stop {
    if docker ps -a | grep -q $1; then
        docker stop $1

        echo "Waiting 5 seconds for $1 to stop"
        sleep 5
    fi
}

# Container destroy
# @param {string} name
function __container_destroy {
    if docker ps -a | grep -q $1; then
        docker rm $1

        echo "Waiting 5 seconds for $1 to destroy"
        sleep 5
    fi
}

# Run under linux
# @param {string} action
# @param {string} name
# @param {*} *
function __PROJECT {
    set -e
    case "$1" in
        'create')
            __container_create $2 $3 $4 "${@:5}"
        ;;

        'run')
            __container_run $2 $3
        ;;

        'stop')
            __container_stop $2
        ;;

        'destroy')
            __container_destroy $2
        ;;

        *)
            echo " "
            echo "Usage: ./do.sh ..."
            echo " "
            echo "    create <name> <type> <port> [args]         # Creates container"
            echo "    run <name> <sleep>                         # Run container"
            echo "    stop <name>                                # Stop container"
            echo "    destroy <name>                             # Destroy container"
            echo " "
        ;;
    esac
}

#################################
# Argument case!

pushd $(__get_src_dir)

echo " "
echo "#####################################"
echo "# Project"
echo " "

if [[ $(__DOCKER_exist) == "true" ]]; then
    echo "Running: $@"

    __PROJECT $1 $2 $3 $4 "${@:5}"
else
    __console_err "You need to install Docker!"
fi

popd
