#!/bin/bash

# Download file
# @param  {string} url
function __download_file {
    wget $1 2>/dev/null || curl -O $1
}

#################################
# Argument case!

set -e
case "$1" in
    'file')
        __download_file $2 $3
    ;;

    *)
        echo "Usage: $0 file <in> [<out>]"
    ;;
esac
