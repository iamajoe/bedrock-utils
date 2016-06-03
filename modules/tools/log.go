package tools

import (
	"fmt"
	"github.com/daviddengcn/go-colortext"
)

// ---------------------------------
// Vars

const projectName = "project"

// ---------------------------------
// Public functions

// Log a string
func Log(module string, str string) {
	if str == "" {
		return
	}

	ct.ChangeColor(ct.White, true, ct.Black, false)
	fmt.Printf("[" + projectName + "] ")
	ct.ChangeColor(ct.Green, true, ct.Black, false)
	fmt.Printf("[" + module + "] ")
	ct.ResetColor()
	fmt.Printf(str + "\n")
}

// LogEmpty logs without module
func LogEmpty(str string) {
	if str == "" {
		return
	}

	ct.ChangeColor(ct.White, true, ct.Black, false)
	fmt.Printf("[" + projectName + "] ")
	ct.ChangeColor(ct.Cyan, true, ct.Black, false)
	fmt.Printf(str + "\n")
	ct.ResetColor()
}

// LogWarn logs a warn
func LogWarn(module string, str string) {
	if str == "" {
		return
	}

	ct.ChangeColor(ct.White, true, ct.Black, false)
	fmt.Printf("[" + projectName + "] ")
	ct.ChangeColor(ct.Yellow, true, ct.Black, false)
	fmt.Printf("[warn] ")
	ct.ChangeColor(ct.Yellow, false, ct.Black, false)
	fmt.Printf("[" + module + "] ")
	ct.ResetColor()
	fmt.Printf(str + "\n")
}

// LogErr logs an error
func LogErr(module string, err error) {
	if err == nil {
		return
	}

	ct.ChangeColor(ct.White, true, ct.Black, false)
	fmt.Printf("[" + projectName + "] ")
	ct.ChangeColor(ct.Red, true, ct.Black, false)
	fmt.Printf("[" + module + "] ")
	ct.ChangeColor(ct.Red, false, ct.Black, false)
	fmt.Printf("[error] ")
	ct.ResetColor()
	fmt.Printf(err.Error() + "\n")
}
