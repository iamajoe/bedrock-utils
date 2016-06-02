package modules

import (
	"path"
)

// ---------------------------------
// Vars

// CreateStruct struct for the project
type CreateStruct struct {
	Dest  string `toml:"destination"`
	Type  string
	Order int
	Env   string
	Sys   string
}

// ---------------------------------
// Public functions

// CreateTask for init
func CreateTask(config []CreateStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		Log("create", task.Type)
		_, err := CreateProject(task)

		// Log whatever
		LogErr("create", err)
	}
}

// CreateProject creates a project
func CreateProject(module CreateStruct) (log string, err error) {
	modulesFiles, _ := GetGlob(path.Join(CmdDir, "create", module.Type, "*"))

	// Go through each in the glob
	for _, file := range modulesFiles {
		dest := ConstructDest("create", module.Dest, file, file)

		// Now lets copy the folder
		FileCopy(FileStruct{Src: file, Dest: dest, Force: true})
	}

	return log, err
}

// ---------------------------------
// Private functions
