exports["webpackNumbers"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __webpack_require__(1);
class CarouselManager {
    constructor(_elementContainerSelector, _elementSelector, _sizeForNonCarousel = 'large', _carouselOptions = {}) {
        this._elementContainerSelector = _elementContainerSelector;
        this._elementSelector = _elementSelector;
        this._sizeForNonCarousel = _sizeForNonCarousel;
        this._carouselOptions = _carouselOptions;
    }
    ;
    /**
     * Starts the carousel functionality.
     */
    initialize() {
        const carouselElement = jquery_1.default(this._elementSelector);
        this._savedHtml = carouselElement.clone()[0];
        this._respondToInitialMediaQuery();
        this._listenToMediaQueryChanges();
    }
    /**
     * Add other controls besides the forward and back button.
     */
    addControls(controlsSelector) {
        const controlsElement = jquery_1.default(controlsSelector);
        controlsElement.click((event) => {
            const $currentTarget = jquery_1.default(event.currentTarget);
            if ($currentTarget.hasClass('active')) {
                return;
            }
            controlsElement.removeClass('active');
            $currentTarget.addClass('active');
            const carouselSlideSelectedId = $currentTarget.attr('carousel-control');
            const carouselSlideSelected = jquery_1.default(`#${carouselSlideSelectedId}`);
            jquery_1.default(this._elementSelector).foundation('changeSlide', true, carouselSlideSelected);
        });
    }
    /**
     * Handles the initial page load before the media query ever changes
     */
    _respondToInitialMediaQuery() {
        this._respondToMediaQuerySize();
    }
    /**
     * Handles how the carousel should react when the media query changes.
     */
    _respondToMediaQuerySize() {
        if (!this._sizeForNonCarousel) {
            this._addCarousel();
            return;
        }
        if (Foundation.MediaQuery.atLeast(this._sizeForNonCarousel)) {
            this._removeCarousel();
        }
        else {
            this._addCarousel();
        }
    }
    /**
     * Listens for the media query to change and responds.
     */
    _listenToMediaQueryChanges() {
        jquery_1.default(window).on('changed.zf.mediaquery', () => {
            this._respondToMediaQuerySize();
        });
    }
    /**
     * When we carousel.destroy(), foundation does some weird stuff to the UI with styling, it is easier to replace the DOM.
     */
    _replaceCarouselContent() {
        const savedElement = jquery_1.default(this._savedHtml).clone();
        const carouselElement = jquery_1.default(this._elementSelector);
        carouselElement.remove();
        jquery_1.default(this._elementContainerSelector).append(savedElement);
    }
    /**
     * Destroys the carousel, unless the carousel did not exist anyways, then we simply make sure the controls are not showing.
     */
    _removeCarousel() {
        if (!this._foundationCarousel) {
            this._removeCarouselNextPrevButtons();
            return;
        }
        this._foundationCarousel.destroy();
        this._foundationCarousel = null;
        this._replaceCarouselContent();
        this._removeCarouselNextPrevButtons();
    }
    /**
     * We must show Orbits controls by default in order for the carousel to work, this helps us remove them conditionally.
     */
    _removeCarouselNextPrevButtons() {
        const carouselContainer = jquery_1.default(this._elementContainerSelector);
        carouselContainer.find('.orbit-controls').remove();
    }
    /**
     * Adds the carousel functionality back
     */
    _addCarousel() {
        if (this._foundationCarousel) {
            return;
        }
        this._replaceCarouselContent();
        const carouselElement = jquery_1.default(this._elementSelector);
        this._foundationCarousel = new Foundation.Orbit(carouselElement, this._carouselOptions);
    }
}
exports.CarouselManager = CarouselManager;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require(undefined);

/***/ })
/******/ ]);