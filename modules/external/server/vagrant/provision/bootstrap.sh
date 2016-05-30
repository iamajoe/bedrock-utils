#!/usr/bin/env bash

# Set env vars
project_src="/vagrant_project_data"
project_src_do=$project_src"/"$1"/modules/external/server/do.sh"

######################################
# Setup dependencies

if [ ! -f /var/log/dependencysetup ];
then
    echo " "
    echo "#######################################"
    echo "# Installing dependencies..."
    echo " "

    # Install dependencies
    # sudo apt-get upgrade
    sudo locale-gen UTF-8
    sudo apt-get -y install curl #git

    # Docker
    sudo groupadd docker
    sudo usermod -aG docker vagrant
    curl -fsSL https://get.docker.com/ | sudo sh

    # Add configs for better usage when in ssh
    echo -e '\n# Project' >> .bashrc
    echo -e 'alias project="'$project_src'"' >> .bashrc
    echo -e 'alias project_do="'$project_src_do'"' >> .bashrc

    alias project="$project_src"
    alias project_do="$project_src_do"

    # So we know next time...
    touch /var/log/dependencysetup
fi
