package modules

// ---------------------------------
// Vars

// ---------------------------------
// Public functions

// NpmInstall installs node dependencies
func NpmInstall(deps []string) (log string, err error) {
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

	return
}
