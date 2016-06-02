#!/usr/bin/env bash

# Set env vars
project_src="/vagrant_project_data"
project_src_do="/vagrant_project_bedrock/bin/external/server/do.sh"

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
    echo -e '' >> .bashrc
    echo -e "# Ensure path exists" >> .bashrc
    echo -e "rm -rf $1 &&  mkdir -p $1 && rmdir $1" >> .bashrc
    echo -e "ln -s $project_src $1" >> .bashrc
    echo -e '' >> .bashrc
    echo -e "export project_do=$project_src_do" >> .bashrc
    echo -e "export BEDROCK_VAGRANT_PROJECT_PATH=$1" >> .bashrc

    # So we know next time...
    touch /var/log/dependencysetup
fi

# Ensure path exists
rm -rf $1 &&  mkdir -p $1 && rmdir $1
ln -s $project_src $1

export project_do=$project_src_do

# Lets link the project folder to the original path
export BEDROCK_VAGRANT_PROJECT_PATH=$1
