/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Event-Archive.js":
/*!**************************************!*\
  !*** ./src/modules/Event-Archive.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class EventArchive {
  constructor() {
    this.getUpcomingEventsButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-upcoming-events-button');
    this.getPastEventsButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-past-events-button');
    this.upcomingEventsContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-upcoming-events-section');
    this.pastEventsContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-past-events-section');
    this.events();
  }
  events() {
    this.getUpcomingEventsButton.on('click', this.getUpcomingEvents.bind(this));
    this.getPastEventsButton.on('click', this.getPastEvents.bind(this));
  }
  getUpcomingEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEvents',
      type: 'GET',
      success: response => {
        if (response.length > 0) {
          this.getUpcomingEventsButton.addClass('hidden');
          this.getUpcomingEventsButton.removeClass('purple-button');
          let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').addClass('centered-text').html('Upcoming Events');
          this.upcomingEventsContainer.append(newHeading);
          let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
          this.upcomingEventsContainer.append(newSection);
          for (let i = 0; i < response.length; i++) {
            let newLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a/>').attr('href', response[i]['post_url']);
            newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h3/>').html(response[i]['post_title']);
            newLink.append(newHeading);
            newSection.append(newLink);
            let newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>');
            let newEm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong/>').html(response[i]['time_string']);
            newP.append(newEm);
            newSection.append(newP);
            newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html(response[i]['post_content']);
            newSection.append(newP);
            if (response[i]['members_only'] == 1) {
              newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html('');
              newEm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<em/>').html('members only');
              newP.append(newEm);
              newSection.append(newP);
            }
            let newLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('orange-yellow-line-break-30');
            newSection.append(newLine);
          }
        }
      },
      failure: response => {
        console.log(response);
      }
    });
  }
  getPastEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getPastEvents',
      type: 'GET',
      success: response => {
        if (response.length > 0) {
          this.getPastEventsButton.addClass('hidden');
          this.getPastEventsButton.removeClass('blue-button');
          let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').addClass('centered-text').html('Past Events');
          this.pastEventsContainer.append(newHeading);
          let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
          this.pastEventsContainer.append(newSection);
          for (let i = 0; i < response.length; i++) {
            let newLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a/>').attr('href', response[i]['post_url']);
            newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h3/>').html(response[i]['post_title']);
            newLink.append(newHeading);
            newSection.append(newLink);
            let newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>');
            let newEm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong/>').html(response[i]['time_string']);
            newP.append(newEm);
            newSection.append(newP);
            newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html(response[i]['post_content']);
            newSection.append(newP);
            if (response[i]['members_only'] == 1) {
              newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html('');
              newEm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<em/>').html('members only');
              newP.append(newEm);
              newSection.append(newP);
            }
            let newLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('orange-yellow-line-break-30');
            newSection.append(newLine);
          }
        }
      },
      failure: response => {
        console.log(response);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventArchive);

/***/ }),

/***/ "./src/modules/Event-Form.js":
/*!***********************************!*\
  !*** ./src/modules/Event-Form.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class EventForms {
  constructor() {
    //Add a new event---------------------------------------------------------------------------
    this.submitNewEventButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc--save-new-event');
    this.cancelNewEventButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc--cancel-new-event');
    this.newEventNameInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-book-organization-new-event');
    this.newEventTextarea = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-book-organization--new-event-details');
    this.displayEventTime = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-time-entered');
    this.eventTimePicker = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-date-time-picker');
    this.presenterSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-presenter-select');
    this.addPresenterButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-attendance-add-presenter');
    this.eventPresenterContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-presentation-container');
    this.events();
  }
  events() {
    this.submitNewEventButton.on('click', this.submitNewEvent.bind(this));
    this.cancelNewEventButton.on('click', this.cancelNewEvent.bind(this));
  }
  submitNewEvent() {
    console.log('submitting new event');
  }
  cancelNewEvent() {
    this.newEventNameInput.val('');
    this.newEventTextarea.val('');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventForms);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Event_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Event-Form */ "./src/modules/Event-Form.js");
/* harmony import */ var _modules_Event_Archive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Event-Archive */ "./src/modules/Event-Archive.js");


const tomcEventForms = new _modules_Event_Form__WEBPACK_IMPORTED_MODULE_0__["default"]();
const tomcEventArchive = new _modules_Event_Archive__WEBPACK_IMPORTED_MODULE_1__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map