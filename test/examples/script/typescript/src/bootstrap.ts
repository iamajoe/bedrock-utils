import index from './scripts/index.ts';

// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    // var bodyWrapper = document.getElementById('body-wrapper');
    var classList = document.body.classList;

    // Remove class no-script
    classList.remove('no-script');

    // Initialize modules
    index.init('foo');
});
