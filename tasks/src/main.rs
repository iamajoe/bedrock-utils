extern crate minifyjs;

// TODO: This should be a module
include!("config/config.rs");

// ------------------------
// Functions

/**
 * Main compile method
 */
fn main() {
    let config_data = get_config();

    println!("Hello, biatch!");
    // println!("{}", config_data.find_path(&["Address"]).unwrap());
}
