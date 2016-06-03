var index = require('./scripts/index.js');

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function() {
    var bodyWrapper = document.getElementById('body-wrapper');
    var classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    // Initialize modules
    index.init('foo');
});
