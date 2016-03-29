extern crate rustc_serialize;

use std::path::Path;
use rustc_serialize::json::Json;

// ------------------------
// Functions

// TODO: This should make a module

/**
 * Gets env
 * @return {string}
 */
pub fn get_env() {
    let build_env = if cfg!(debug_assertions) { "dev" } else { "prod" };
    // TODO: Return
}

/**
 * Gets the right config
 * @return {json}
 */
pub fn get_config() {
    let build_env = if cfg!(debug_assertions) { "dev" } else { "prod" };
    // TODO: This should go to the dirname
    let config = include_str!("config/config.json");

    // Parse build data
    // config = Json::from_str(config).unwrap();
    // if () {
    //     config =
    // } else {
    //     config =
    // }

    // return config;
}
