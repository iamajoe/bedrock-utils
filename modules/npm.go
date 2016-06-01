package modules

import (
	"path"
	"strings"
)

// ---------------------------------
// Vars

// ---------------------------------
// Public functions

// NpmInstall installs node dependencies
func NpmInstall(deps []string) (log string, err error) {
	vendorPath := NpmFindModules()

	for _, dep := range deps {
		realDep := NpmGetDepName(dep)

		// Install
		if NotExist(path.Join(vendorPath, realDep)) {
			_, err = RawCommand(RawStruct{
				Command: "npm",
				Args:    []string{"install", dep},
			})

			if err != nil {
				return "", err
			}
		}
	}

	return
}

// NpmFindModules tries to find a node_modules folder
func NpmFindModules() (vendorPath string) {
	basePath := path.Join(CmdDir, "..")

	// Lets try and find
	for i := 0; i < 5; i++ {
		vendorPath = path.Join(basePath, "node_modules")

		if NotExist(vendorPath) {
			basePath = path.Join(basePath, "..")
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
