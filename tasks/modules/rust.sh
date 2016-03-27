#!/bin/bash

# Check if user has rust
# @param {string} bin
function __has_rust {
    if hash rustc 2>/dev/null; then
        echo "true"
    elif [ -d ~/.bin/rust/ ]; then
        echo "true"
    else
        echo "false"
    fi
}

# Build rust
# @param {string} bin
# @param {string} env
function __build_rust {
    local cargo_bin

    if hash cargo 2>/dev/null; then
        cargo_bin=cargo
    else
        cargo_bin=~/.bin/rust/bin/cargo
    fi

    # Or maybe not yet
    if [[ '$1' == 'prod' ]]; then
        $cargo_bin build --release --verbose
    else
        $cargo_bin build --verbose
    fi
}

# Run rust
# @param {string} bin
# @param {string} env
function __run_rust {
    local cargo_bin

    if hash cargo 2>/dev/null; then
        cargo_bin=cargo
    else
        cargo_bin=~/.bin/rust/bin/cargo
    fi

    if [[ '$1' == 'prod' ]]; then
        $cargo_bin run --release
    else
        $cargo_bin run
    fi
}

# Install module
# @param {string} bin
function __install_rust {
    # Finally lets download module
    if [[ $(__has_rust) != "true" ]]; then
        # Get rust
        if [ ! -d ~/.bin/rust ]; then
            git clone https://github.com/brson/multirust .tmp/multirust

            pushd .tmp/multirust
            ./build.sh
            ./install.sh --prefix=~/.bin/multirust

            # Set for stable
            ~/.bin/multirust/bin/multirust default stable
            popd
            rm -rf .tmp
        fi
    fi
}

# Configs module in user files
# @param {string} userrc
# @param {string} bin
function __config_rust {
    if [ -z "$RUSTISSETINRC" ] && [[ $(__has_rust) == "true" ]]; then
        echo "Config Rust..."

        # Now add the export
        echo -e '\n# Rust' >> $1
        echo -e 'export PATH=~/.bin/multirust/bin:$PATH' >> $1
        echo -e 'export RUSTISSETINRC="set"' >> $1
    fi
}

#################################
# Argument case!

set -e
case "$1" in
    'has')
        __has_rust $2
    ;;

    'config')
        __config_rust $2 $3
    ;;

    'install')
        __install_rust $2
    ;;

    'build')
        __build_rust $2 $3
    ;;

    'run')
        __build_rust $2 $3
        __run_rust $2 $3
    ;;

    *)
        echo "Usage: $0 has <bin>|config <userrc> <bin>|install <bin>|build <bin> <prod|dev>|run <bin> <prod|dev>"
    ;;
esac
