package "modules/build"

import (
	"bytes"
	"os/exec"
)

// ---------------------------------
// Vars

// RawStruct struct for the project
type RawStruct struct {
	Command string
	Args    []string
	Order   int
	Env     string
	Sys     string
}

// ---------------------------------
// Public functions

// RawCommand performs a raw command
func RawCommand(file RawStruct) (log string, err error) {
	// Create an *exec.Cmd
	cmd := exec.Command(file.Command, file.Args...)

	// Stdout buffer
	cmdOutput := &bytes.Buffer{}
	// Attach buffer to command
	cmd.Stdout = cmdOutput

	// Execute command
	err = cmd.Run() // will wait for command to return
	if err != nil {
		return "", err
	}

	// Only output the commands stdout
	output := cmdOutput.Bytes()
	if len(output) > 0 {
		return string(output), nil
	}

	return
}

// ---------------------------------
// Private functions
