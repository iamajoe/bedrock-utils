package "modules/build"

import (
	"os"
	"path"
	"path/filepath"
)

// ---------------------------------
// Vars

// FileStruct struct for the project
type FileStruct struct {
	Src    string `toml:"source"`
	Dest   string `toml:"destination"`
	Ignore string
	Order  int
	Env    string
	Sys    string
}

// ---------------------------------
// Public functions

// FileCopy copies * from source to destination
func FileCopy(file FileStruct) (log string, err error) {
	srcFile, srcErr := os.Stat(file.Src)

	switch {
	// Check if src exists
	case srcErr != nil:
		err = srcErr
	// Check if src is directory
	case srcFile.IsDir():
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
// Not task functions

// FileNotExist checks if file exists
func FileNotExist(src string) bool {
	_, err := os.Stat(src)
	return err != nil
}

// FileGetAbsolute gets absolute path
func FileGetAbsolute(filePath string) string {
	if len(filePath) > 0 && string(filePath[0]) != "/" {
		wd, _ := os.Getwd()
		filePath = path.Join(wd, filePath)
	}

	return filePath
}

// FileGetGlob gets glob of files
func FileGetGlob(filePath string) (files []string, err error) {
	// Get all matching
	files, err = filepath.Glob(filePath)

	return files, err
}

// FileGetFilename gets filename
func FileGetFilename(filePath string) string {
	return path.Base(filePath)
}

// FileEnsure ensures that all directories exist
func FileEnsure(filePath string) (err error) {
	mode := os.FileMode(int(0777))
	dir := path.Dir(filePath)

	if err := os.MkdirAll(dir, mode); err != nil {
		return err
	}

	return
}

// ---------------------------------
// Private functions

// Copy file from source to destination
func fileCopy(file FileStruct) (err error) {
	src := file.Src
	dest := file.Dest

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
