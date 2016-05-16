package "modules/build"

import (
	"errors"
	"github.com/BurntSushi/toml"
)

// ---------------------------------
// Vars

// ConfigStruct struct for the project
type ConfigStruct struct {
	MaxOrder int `toml:"max_order"`
	Copy     []FileStruct
	Rename   []FileStruct
	Remove   []FileStruct
	Style    []StyleStruct
	Script   []ScriptStruct
	Raw      []RawStruct
}

// ---------------------------------
// Public functions

// ConfigGet copies * from source to destination
func ConfigGet(file string) (obj ConfigStruct, err error) {
	configPath := FileGetAbsolute(file)
	if FileNotExist(configPath) {
		err = errors.New("Config file doesn't exist!")
		return
	}

	// Read the config file
	if _, err = toml.DecodeFile(configPath, &obj); err != nil {
		return
	}

	// Set a default
	if obj.MaxOrder == 0 {
		obj.MaxOrder = 30
	}

	// Now lets return the config obj
	return obj, nil
}

// ---------------------------------
// Private functions
