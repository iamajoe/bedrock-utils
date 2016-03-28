#!/bin/bash

# Download file
# @param  {string} in
# @param  {string} out
function __DOWNLOAD_file {
    wget $1 2>/dev/null || curl -O $1
}

#################################
# Argument case!

set -e
case "$1" in
    'file')
        __DOWNLOAD_file $2 $3
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    file <in> [<out>]          # Download file"
    ;;
esac
