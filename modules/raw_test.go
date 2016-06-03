package modules

import (
	"github.com/sendoushi/bedrock-utils/modules/tools"
	"os"
	"path"
	"testing"
)

// ---------------------------------
// Vars

var testRawWd, _ = os.Getwd()
var testRawBaseData string = path.Join(testRawWd, "../test/test_raw")
var testRawBaseTmp string = path.Join(testRawBaseData, "tmp")

// TestRawCommand tests the function
func TestRawCommand(t *testing.T) {
	// Prepare test
	destFile := path.Join(testRawBaseTmp, "foo")

	// Create a folder
	_, err := RawCommand(RawStruct{
		Command: "mkdir",
		Args:    []string{testRawBaseTmp},
	})
	if err != nil || tools.NotExist(testRawBaseTmp) {
		t.Error("Expected a folder creation")
	}

	// Create a file
	_, err = RawCommand(RawStruct{
		Command: "touch",
		Args:    []string{destFile},
	})
	if err != nil || tools.NotExist(destFile) {
		t.Error("Expected a file creation")
	}

	// Remove all test data
	_, _ = FileRemove(FileStruct{Src: testRawBaseTmp})
}
