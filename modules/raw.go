package modules

import (
	"errors"
	"io"
	"os"
	"os/exec"
	"strings"
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

type rawBrokenWriter struct {
	w io.Writer
	c int
}

// ---------------------------------
// Public functions

// RawTask for init
func RawTask(config []RawStruct, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Raw command
		Log("raw", task.Command+" "+strings.Join(task.Args, " "))

		logVal, err := RawCommand(task)
		LogErr("raw", err)
		Log("raw] [result", logVal)

		// TODO: Raw Command should log everything!
		// Not logging a thing!
	}
}

// ---------------------------------
// Private functions

// RawCommand performs a raw command
func RawCommand(file RawStruct) (log string, err error) {
	// Create an *exec.Cmd
	cmd := exec.Command(file.Command, file.Args...)
	cmd.Stdout = &rawBrokenWriter{os.Stdout, 1}

	// Execute command
	err = cmd.Run() // will wait for command to return
	if err != nil {
		return "", err
	}

	return
}

// Write is a writer for the raw command
func (bw *rawBrokenWriter) Write(data []byte) (int, error) {
	if bw.c > 0 {
		bw.c = bw.c - 1
		return bw.w.Write(data)
	}

	return 0, errors.New("Command broke")
}
