/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Imports
	
	var index = __webpack_require__(1);
	
	/* eslint-disable no-undef */
	var $ = jQuery;
	/* eslint-enable no-undef */
	
	// Wait for the document to be ready
	$(document).ready(function () {
	    var classList = document.body.classList;
	
	    // Remove class no-script
	    classList.remove('no-script');
	
	    if (is.isIe()) {
	        classList.add('is-ie');
	    }
	
	    if (is.isMobile()) {
	        classList.add('is-mobile');
	    }
	
	    // Initialize all containers
	    index.init();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* eslint-disable no-undef */
	var $ = jQuery;
	/* eslint-enable no-undef */
	
	// --------------------------------
	// Vars
	
	var wrapperEl = void 0;
	
	// --------------------------------
	// Functions
	
	/**
	 * Initializes header
	 */
	var init = function init() {
	    wrapperEl = wrapperEl || $('.page-index');
	
	    if (!wrapperEl.length) {
	        return;
	    }
	
	    // TODO: Set whatever
	};
	
	// --------------------------------
	// Export
	
	exports.default = { init: init };

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map