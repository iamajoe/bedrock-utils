package modules

import (
	"errors"
	"github.com/BurntSushi/toml"
	"github.com/sendoushi/bedrock-utils/modules/tools"
)

// ---------------------------------
// Vars

// ConfigStruct struct for the project
type ConfigStruct struct {
	MaxOrder int `toml:"max_order"`
	Copy     []FileStruct
	Rename   []FileStruct
	Remove   []FileStruct
	Create   []CreateStruct
	Style    []StyleStruct
	Script   []ScriptStruct
	Raw      []RawStruct
	Server   ServerStruct
}

// ---------------------------------
// Public functions

// ConfigGet copies * from source to destination
func ConfigGet(file string) (obj ConfigStruct, err error) {
	configPath := tools.GetAbsolute(file)
	if tools.NotExist(configPath) {
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
