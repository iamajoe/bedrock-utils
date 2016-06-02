package modules

import (
	"os"
	"path"
)

// ---------------------------------
// Vars

// FileStruct struct for the project
type FileStruct struct {
	Src    string `toml:"source"`
	Dest   string `toml:"destination"`
	Ignore string
	Force  bool
	Order  int
	Env    string
	Sys    string
}

// ---------------------------------
// Public functions

// FileTask for init
func FileTask(config []FileStruct, taskType string, order int, env string, sys string) {
	for _, task := range config {
		var shouldContinue bool
		if task.Order, task.Env, task.Sys, shouldContinue = InitDecision(
			task.Order, task.Env, task.Sys, order, env, sys,
		); shouldContinue {
			continue
		}

		// Get the right paths
		src, ignore := GetPaths(task.Src, task.Ignore)
		originalDest := task.Dest

		// Go through each in the glob
		for _, file := range src {
			// Check if is in the ignore
			if ArrContainsStr(ignore, file) {
				continue
			}

			Log(taskType, file)

			// Reset dest
			task.Dest = originalDest

			// Needs this
			task.Dest = ConstructDest(taskType, task.Dest, file, task.Src)
			task.Src = file

			// Instantiate log
			var logVal string
			var err error

			switch taskType {
			case "rename":
				logVal, err = FileRename(task)
			case "remove":
				logVal, err = FileRemove(task)
			default:
				logVal, err = FileCopy(task)
			}

			// Log whatever
			LogErr(taskType, err)
			Log(taskType+"] [result", logVal)
		}
	}
}

// FileCopy copies * from source to destination
func FileCopy(file FileStruct) (log string, err error) {
	// Remove the file if it has force
	if !NotExist(file.Dest) && file.Force {
		FileRemove(FileStruct{Src: file.Dest})
	}

	srcFile, srcErr := os.Stat(file.Src)

	switch {
	// Check if src exists
	case srcErr != nil:
		err = srcErr
	// Check if src is directory
	case srcFile.IsDir():
		// TODO: What about the ignores?
		err = folderCopy(file)
	// It must be a file
	default:
		err = fileCopy(file)
	}

	return log, err
}

// FileRemove removes * from source to destination
func FileRemove(file FileStruct) (log string, err error) {
	src := file.Src

	err = os.RemoveAll(src)
	if err != nil {
		return "", err
	}

	return
}

// FileRename renames * from source to destination
func FileRename(file FileStruct) (log string, err error) {
	src := file.Src
	dest := file.Dest

	err = os.Rename(src, dest)
	if err != nil {
		return "", err
	}

	return
}

// ---------------------------------
// Private functions

// Copy file from source to destination
func fileCopy(file FileStruct) (err error) {
	src := file.Src
	dest := file.Dest

	// We need to ensure that the folder exists
	err = EnsurePath(dest)
	if err != nil {
		return err
	}

	// Remove old destination file if exists
	FileRemove(FileStruct{Src: dest})

	// Copy the file
	err = os.Link(src, dest)
	if err != nil {
		return err
	}

	return
}

// Copy folder from source to destination
func folderCopy(file FileStruct) (err error) {
	src := file.Src
	dest := file.Dest

	// We need to ensure that the folder exists
	err = EnsurePath(dest)
	if err != nil {
		return err
	}

	// Remove old destination file if exists
	FileRemove(FileStruct{Src: dest})

	// Make folder
	mode := os.FileMode(int(0777))
	if err := os.MkdirAll(dest, mode); err != nil {
		return err
	}

	// Read the files inside
	dir, _ := os.Open(src)
	files, _ := dir.Readdir(-1)

	// Loop each file
	for _, file := range files {
		srcPath := path.Join(src, file.Name())
		destPath := path.Join(dest, file.Name())

		// Copy new file
		_, err = FileCopy(FileStruct{Src: srcPath, Dest: destPath})
		if err != nil {
			return err
		}
	}

	return
}
