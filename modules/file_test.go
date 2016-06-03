package modules

import (
	"github.com/sendoushi/bedrock-utils/modules/tools"
	"os"
	"path"
	"testing"
)

// ---------------------------------
// Vars

var testFileWd, _ = os.Getwd()
var testFileBaseData string = path.Join(testFileWd, "../test/test_file")
var testFileBaseTmp string = path.Join(testFileBaseData, "tmp")

// TestFileCopy tests the function
func TestFileCopy(t *testing.T) {
	// Prepare test
	srcFile := path.Join(testFileBaseData, "foo")
	destFile := path.Join(testFileBaseTmp, "foo")
	srcFolder := path.Join(testFileBaseData, "bar")
	destFolder := path.Join(testFileBaseTmp, "bar")
	destFolderFile := path.Join(destFolder, "foobar")

	// Copy a file
	_, err := FileCopy(FileStruct{Src: srcFile, Dest: destFile})
	if err != nil || tools.NotExist(destFile) {
		t.Error("Expected a file copy")
	}

	// Copy a folder
	_, err = FileCopy(FileStruct{Src: srcFolder, Dest: destFolder})
	if err != nil || tools.NotExist(destFolder) || tools.NotExist(destFolderFile) {
		t.Error("Expected a folder copy")
	}

	// Remove all test data
	_, _ = FileRemove(FileStruct{Src: testFileBaseTmp})
}

// TestFileRemove tests the function
func TestFileRemove(t *testing.T) {
	// Prepare test
	srcFile := path.Join(testFileBaseData, "foo")
	destFile := path.Join(testFileBaseTmp, "foo")
	srcFolder := path.Join(testFileBaseData, "bar")
	destFolder := path.Join(testFileBaseTmp, "bar")
	destFolderFile := path.Join(destFolder, "foobar")
	_, _ = FileCopy(FileStruct{Src: srcFile, Dest: destFile})
	_, _ = FileCopy(FileStruct{Src: srcFolder, Dest: destFolder})

	// Remove a file
	_, err := FileRemove(FileStruct{Src: destFile})
	if err != nil || !tools.NotExist(destFile) {
		t.Error("Expected a file remove")
	}

	// Remove a folder
	_, err = FileRemove(FileStruct{Src: destFolder})
	if err != nil || !tools.NotExist(destFolder) || !tools.NotExist(destFolderFile) {
		t.Error("Expected a folder remove")
	}

	// Remove all test data
	_, _ = FileRemove(FileStruct{Src: testFileBaseTmp})
}

// TestFileRename tests the function
func TestFileRename(t *testing.T) {
	// Prepare test
	srcFile := path.Join(testFileBaseData, "foo")
	destFile := path.Join(testFileBaseTmp, "foo")
	srcFolder := path.Join(testFileBaseData, "bar")
	destFolder := path.Join(testFileBaseTmp, "bar")
	_, _ = FileCopy(FileStruct{Src: srcFile, Dest: destFile})
	_, _ = FileCopy(FileStruct{Src: srcFolder, Dest: destFolder})

	srcFile = destFile
	destFile = path.Join(testFileBaseTmp, "_foo")
	srcFolder = destFolder
	destFolder = path.Join(testFileBaseTmp, "_bar")
	destFolderFile := path.Join(destFolder, "foobar")

	// Rename a file
	_, err := FileRename(FileStruct{Src: srcFile, Dest: destFile})
	if err != nil || tools.NotExist(destFile) {
		t.Error("Expected a file rename")
	}

	// Rename a folder
	_, err = FileRename(FileStruct{Src: srcFolder, Dest: destFolder})
	if err != nil || tools.NotExist(destFolder) || tools.NotExist(destFolderFile) {
		t.Error("Expected a folder copy")
	}

	// Remove all test data
	_, _ = FileRemove(FileStruct{Src: testFileBaseTmp})
}
