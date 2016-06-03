package modules

import (
	"github.com/sendoushi/bedrock-utils/modules/tools"
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
func CreateTask(config []CreateStruct, commandType string, order int, env string, sys string) {
	if commandType != "init" {
		return
	}

	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = tools.InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		tools.Log("create", task.Type)
		_, err := CreateProject(task)

		// Log whatever
		tools.LogErr("create", err)
	}
}

// CreateProject creates a project
func CreateProject(module CreateStruct) (log string, err error) {
	modulesFiles, _ := tools.GetGlob(path.Join(CmdDir, "external/create", module.Type, "*"))
	files := []FileStruct{}

	// Go through each in the glob
	for _, file := range modulesFiles {
		files = append(files, FileStruct{Src: file, Dest: module.Dest, Force: true})
	}

	// Now lets run!
	FileTask(files, "copy", 0, "", "")

	return log, err
}

// ---------------------------------
// Private functions
