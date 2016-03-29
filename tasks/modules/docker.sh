#!/bin/bash

# Check if user has module
# @param {string} bin
function __DOCKER_exist {
    if hash docker-machine 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __DOCKER_config {
    if [ -z "$DOCKERISSETINRC" ] && [[ $(__DOCKER_exist $2) == "true" ]]; then
        echo "Config: [tasks/docker]"

        # Now add the export
        echo -e '\n# Docker' >> $1
        # echo -e 'eval "$(docker-machine env default)"' >> $1
        echo -e 'export DOCKERISSETINRC="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'exist')
        __DOCKER_exist $2
    ;;

    'config')
        __DOCKER_config $2 $3
    ;;

    *)
        echo ""
        echo "Usage: $0 ..."
        echo ""
        echo "    exist <bin>                # Check if Docker exists in the system"
        echo "    config <userrc> <bin>      # Configs Docker"
    ;;
esac
