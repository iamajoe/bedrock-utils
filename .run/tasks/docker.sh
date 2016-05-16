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

# Gets the public folder
# @return {string}
function __DOCKER_get_public_folder {
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

# --------------------------------------------

# Starts docker
# @param {string} name
function __DOCKER_start {
    if docker ps -a | grep -q $1; then
        echo "Starting the $1 docker container"
        docker start $1

        echo "Waiting 30 seconds for $1 to boot"
        sleep 30
    fi
}

# Stops docker
# @param {string} name
function __DOCKER_stop {
    if docker ps -a | grep -q $1; then
        docker stop $1

        echo "Waiting 5 seconds for $1 to stop"
        sleep 5
    fi
}

# Destroys docker
# @param {string} name
function __DOCKER_destroy {
    if docker ps -a | grep -q $1; then
        docker rm $1

        echo "Waiting 5 seconds for $1 to destroy"
        sleep 5
    fi
}

# Destroys all dockers
# @param {string} pkg
function __DOCKER_all_destroy {
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
}

# Creates docker container
# @param {string} name
# @param {string} type
function __DOCKER_create {
    if ! docker ps -a | grep -q $1"-"$2; then
        echo "Creating a new $2 docker container"

        local public=$(__DOCKER_get_public_folder)

        # Decide module
        case "$2" in
            'mysql')
                local sql_initial=../db/initial.sql
                local sql_mock=../db/mock.sql

                # In case is running under vagrant
                if [ -d /vagrant_project_data ]; then
                    sql_initial=/vagrant_project_data/db/initial_not_linux.sql
                    sql_mock=/vagrant_project_data/db/mock_not_linux.sql
                fi

                # TODO: Refactor
                # Finally create the docker
                if [ -f $sql_initial ]; then
                    docker create \
                        --name $1"-"$2 \
                        -e MYSQL_ROOT_PASSWORD=XOACx5zq \
                        -e MYSQL_DATABASE=$1 \
                        -e MYSQL_USER=$1"_usr" \
                        -e MYSQL_PASSWORD='GtdDZuDKW81q' \
                        -e STARTUP_SQL=$sql_mock \
                        -v $sql_initial:/docker-entrypoint-initdb.d/initial.sql \
                        -v $sql_mock:/docker-entrypoint-initdb.d/mock.sql \
                        -p 3306:3306 \
                        mysql:5.6
                else
                    docker create \
                        --name $1"-"$2 \
                        -e MYSQL_ROOT_PASSWORD=XOACx5zq \
                        -e MYSQL_DATABASE=$1 \
                        -e MYSQL_USER=$1"_usr" \
                        -e MYSQL_PASSWORD='GtdDZuDKW81q' \
                        -e STARTUP_SQL=$sql_mock \
                        -p 3306:3306 \
                        mysql:5.6
                fi
            ;;
            'nginx')
                docker create \
                    --name $1"-"$2 \
                    -p 8000:80 \
                    --link $1"-mysql":mysql \
                    -v $public:/data/www/public \
                    -v $(pwd)/logs:/data/run/logs \
                    vredens/ln_p
            ;;
            'redmine')
                docker create \
                    --name $1"-"$2 \
                    -e MYSQL_ROOT_PASSWORD=XOACx5zq \
                    -e MYSQL_DATABASE=$1 \
                    -p 3000:3000 \
                    --link $1"-mysql":mysql \
                    redmine
            ;;
        esac

        # Just wait some seconds
        sleep 3
    fi
}

# Copy project needed files
# @param {string} pkg
function __DOCKER_copy {
    local public=$(__DOCKER_get_public_folder)
}

# ------------------------------------------------

# Get container ip
# @param {string} name
function __DOCKER_get_ip {
    local ip=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1)
    # TODO: Check the port...
    local port='[PORT]'
    echo "$1 ip is: $ip:$port"
}

# ------------------------------------------------

# Run under linux
# @param {string} pkg
# @param {string} action
# @param {string} arg1
# @param {string} arg2
function __DOCKER {
    if [[ $(__DOCKER_exist) == "true" ]]; then
        set -e
        case "$2" in
            'create')
                __DOCKER_create $1 $3
            ;;

            'run')
                __DOCKER_start $1"-"$3 $4
            ;;

            'copy')
                __DOCKER_copy $1
            ;;

            'stop')
                __DOCKER_stop $1"-"$3
            ;;

            'destroy')
                __DOCKER_destroy $1"-"$3
            ;;

            'destroy-all')
                __DOCKER_all_destroy $1
            ;;

            # -----------------------------------------------

            'get-ip')
                __DOCKER_get_ip $1"-"$3
            ;;

            *)
                echo " "
                echo "Usage: ./do.sh ..."
                echo " "
                echo "    <pkg_name> create <type>               # Creates docker container"
                echo "    <pkg_name> run <type> [prod]           # Run container in env"
                echo "    <pkg_name> copy                        # Copy needed project files"
                echo "    <pkg_name> stop <type>                 # Stop container"
                echo "    <pkg_name> destroy <type>              # Destroy container"
                echo "    <pkg_name> destroy-all                 # Destroy servers and containers"
                echo " "
                echo "    <pkg_name> get-ip <type>               # Gets containers' ip"
                echo " "
            ;;
        esac
    else
        __console_err "You need to install Docker!"
    fi
}

#################################
# Argument case!

pushd $(__get_src_dir)
__DOCKER $1 $2 $3 $4
popd
