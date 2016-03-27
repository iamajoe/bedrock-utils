#!/bin/bash

# Check if user has docker
function __has_docker {
    if hash docker-machine 2>/dev/null; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs docker in user files
function __config_docker {
    if [ -z "$DOCKERISSETINRC" ] && [[ $(__has_docker) == "true" ]]; then
        echo "Config Docker..."

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
    'has')
        __has_docker
    ;;

    'config')
        __config_docker $2
    ;;

    *)
        echo "Usage: $0 has|config <userrc>"
    ;;
esac
