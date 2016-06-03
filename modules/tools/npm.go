package tools

import (
	"os"
	"os/exec"
	"path"
	"strings"
)

// ---------------------------------
// Vars

// ---------------------------------
// Public functions

// NpmInstall installs node dependencies
func NpmInstall(deps []string, cmdDir string) (log string, err error) {
	vendorPath := NpmFindModules(cmdDir)

	for _, dep := range deps {
		realDep := NpmGetDepName(dep)

		// Install
		if NotExist(path.Join(vendorPath, realDep)) {
			// Create an *exec.Cmd
			cmd := exec.Command("npm", "install", dep)
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr

			// Execute command
			cmd.Run()
		}
	}

	return
}

// NpmFindModules tries to find a node_modules folder
func NpmFindModules(cmdDir string) (vendorPath string) {
	basePath := cmdDir
	dirFound := false

	// Lets try and find related to the CmdDir
	for i := 0; i < 5; i++ {
		vendorPath = path.Join(basePath, "node_modules")

		if NotExist(vendorPath) {
			basePath = path.Join(basePath, "..")
		} else {
			dirFound = true
			break
		}
	}

	// Lets try and find related to the working dir
	if !dirFound {
		basePath, _ = os.Getwd()

		for i := 0; i < 5; i++ {
			vendorPath = path.Join(basePath, "node_modules")

			if NotExist(vendorPath) {
				basePath = path.Join(basePath, "..")
			} else {
				dirFound = true
				break
			}
		}
	}

	return vendorPath
}

// NpmGetDepName returns the dependency name
func NpmGetDepName(dep string) (name string) {
	i := strings.Index(dep, "@")
	if i == -1 {
		i = strings.Index(dep, "~")
	}
	if i == -1 {
		i = strings.Index(dep, "^")
	}
	if i == -1 {
		i = len(dep)
	}

	// Now the name
	name = dep[0:i]

	return name
}
