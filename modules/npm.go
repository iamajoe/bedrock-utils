package modules

import (
	"os"
)

// ---------------------------------
// Vars

// ---------------------------------
// Public functions

// NpmInstall installs node dependencies
func NpmInstall(deps []string) (log string, err error) {
	actualWd, _ := os.Getwd()

	// Lets change for the cmd dir
	os.Chdir(CmdDir)

	for _, dep := range deps {
		// Install
		if NotExist("node_modules/" + dep) {
			_, err = RawCommand(RawStruct{
				Command: "npm",
				Args:    []string{"install", dep},
			})

			if err != nil {
				return "", err
			}
		}
	}

	// Lets change back to the actual wd
	os.Chdir(actualWd)

	return
}
