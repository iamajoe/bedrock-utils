#!/bin/bash

# Gets cargo
# @param {string} bin
function __RUST_get_cargo {
    local cargo_bin

    # TODO: It could check in the PATH
    if hash cargo 2>/dev/null; then
        cargo_bin="cargo"
    else
        cargo_bin="$1/rust/bin/cargo"
    fi

    echo $cargo_bin
}

# Check if user has module
# @param {string} bin
function __RUST_exist {
    if hash rustc 2>/dev/null; then
        echo "true"
    elif [ -d "$1/rust" ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __RUST_config {
    if [ -z "$RUSTISSETINRC" ] && [[ $(__RUST_exist $2) == "true" ]]; then
        echo "Config: [tasks/rust]"

        # Now add the export
        echo -e '\n# Rust' >> $1
        echo -e "export PATH=$2/multirust/bin:$PATH" >> $1
        echo -e 'export RUSTISSETINRC="set"' >> $1
    fi
}

# Install module
# @param {string} bin
function __RUST_install {
    # Finally lets download module
    if [[ $(__RUST_exist $1) != "true" ]]; then
        # Get rust
        if [ ! -d "$1/rust" ]; then
            echo "Install: [tasks/rust]"

            git clone https://github.com/brson/multirust .tmp/multirust

            pushd .tmp/multirust
            ./build.sh
            ./install.sh --prefix="$1/multirust"

            # Set for stable
            "$1/multirust/bin/multirust" default stable
            popd
            rm -rf .tmp
        fi
    fi
}

# Build module project
# @param {string} bin
# @param {string} env
function __RUST_build {
    local cargo_bin=$(__RUST_get_cargo $1)

    echo "Build: [tasks/rust] [$2]"

    # Or maybe not yet
    if [[ '$2' == 'prod' ]]; then
        $cargo_bin build --release --verbose
    else
        $cargo_bin build --verbose
    fi
}

# Run module project
# @param {string} bin
# @param {string} env
function __RUST_run {
    local cargo_bin=$(__RUST_get_cargo $1)

    echo "Run: [tasks/rust] [$1]"

    if [[ '$1' == 'prod' ]]; then
        $cargo_bin run --release
    else
        $cargo_bin run
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'exist')
        __RUST_exist $2
    ;;

    'config')
        __RUST_config $2 $3
    ;;

    'install')
        __RUST_install $2
    ;;

    'build')
        __RUST_build $2 $3
    ;;

    'run')
        __RUST_run $2 $3
    ;;

    *)
        echo "Usage: $0 ..."
        echo "    exist <bin>                # Check if Rust exists in the system"
        echo "    config <userrc> <bin>      # Configs Rust"
        echo "    install <bin>              # Installs Rust"
        echo "    build <bin> <prod|dev>     # Builds Rust project"
        echo "    run <bin> <prod|dev>       # Runs Rust project"
    ;;
esac
