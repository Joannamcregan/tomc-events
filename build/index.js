/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Add-Event.js":
/*!**********************************!*\
  !*** ./src/modules/Add-Event.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class AddEvent {
  constructor() {
    this.registerSpans = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-event-register');
    this.events();
  }
  events() {
    this.registerSpans.on('click', this.register.bind(this));
  }
  register(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/registerForEvent',
      type: 'POST',
      data: {
        'event': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('post')
      },
      success: response => {
        if (response > 0) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent().children('.tomc-registration-success').removeClass('hidden');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent().children('.tomc-registration-fail').addClass('hidden');
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent().children('.tomc-registration-success').addClass('hidden');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent().children('.tomc-registration-fail').removeClass('hidden');
        }
      },
      failure: response => {
        console.log(response);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddEvent);

/***/ }),

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
    this.getUpcomingEventsSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-upcoming-events-span');
    this.getPastEventsSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-past-events-span');
    this.upcomingEventsContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-upcoming-events-section');
    this.pastEventsContainer = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-past-events-section');
    this.events();
  }
  events() {
    this.getUpcomingEventsSpan.on('click', this.getUpcomingEvents.bind(this));
    this.getPastEventsSpan.on('click', this.getPastEvents.bind(this));
  }
  getUpcomingEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEvents',
      type: 'GET',
      success: response => {
        this.getUpcomingEventsSpan.addClass('hidden');
        this.getUpcomingEventsSpan.removeClass('purple-span');
        let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').addClass('centered-text').html('Upcoming Events');
        this.upcomingEventsContainer.append(newHeading);
        if (response.length > 0) {
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
        } else {
          let newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html('There are currently no upcoming events scheduled.');
          this.upcomingEventsContainer.append(newP);
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
        this.getPastEventsSpan.addClass('hidden');
        this.getPastEventsSpan.removeClass('blue-span');
        let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').addClass('centered-text').html('Past Events');
        this.pastEventsContainer.append(newHeading);
        if (response.length > 0) {
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
        } else {
          let newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html("We haven't had any events yet!");
          this.pastEventsContainer.append(newP);
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

/***/ "./src/modules/My-Events.js":
/*!**********************************!*\
  !*** ./src/modules/My-Events.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class MyEvents {
  constructor() {
    //Add a new event---------------------------------------------------------------------------
    this.addEventSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-add-event-span');
    this.addEventSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-section');
    this.upcomingRegisteredEventsSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#upcoming-registered-events-span');
    this.upcomingRegisteredEventsSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-registered-events-section');
    this.manageUpcomingEventsSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#manage-upcoming-events-span');
    this.manageUpcomingEventsSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-manage-upcoming-events-section');
    this.managePastEventsSpan = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#manage-past-events-span');
    this.managePastEventsSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-manage-past-events-section');
    this.freeOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-free-option');
    this.ticketOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-ticket-option');
    this.ticketSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-ticket-section');
    this.ticketProductSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-ticket-product');
    this.eventTitle = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-title');
    this.eventDate = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-date');
    this.eventTime = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-time');
    this.timeZoneOptions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-event-time-zone-option');
    this.eventDescription = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-description');
    this.membersOnlyOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-members-only-option');
    this.openOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-open-option');
    this.limitSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-limit-section');
    this.limitedOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-limited-option');
    this.unlimitedOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-unlimited-option');
    this.eventLimit = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-limit');
    this.ticketLimitReminder = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-limit-ticket-reminder');
    this.events();
    this.requiresTicket = false;
    this.isMembersOnly = false;
    this.chosenTimeZone = '';
    this.isLimited = false;
  }
  events() {
    this.addEventSpan.on('click', this.addNewEvent.bind(this));
    this.upcomingRegisteredEventsSpan.on('click', this.getRegisteredEvents.bind(this));
    this.freeOption.on('click', this.selectFreeOption.bind(this));
    this.ticketOption.on('click', this.selectTicketOption.bind(this));
    this.membersOnlyOption.on('click', this.selectMembersOnlyOption.bind(this));
    this.openOption.on('click', this.selectOpenOption.bind(this));
    this.timeZoneOptions.on('click', this.selectTimeZone.bind(this));
    this.unlimitedOption.on('click', this.selectUnlimitedOption.bind(this));
    this.limitedOption.on('click', this.selectLimitedOption.bind(this));
  }
  addNewEvent() {
    this.addEventSection.removeClass('hidden');
  }
  selectFreeOption() {
    this.ticketOption.removeClass('tomc-events--option-selected');
    this.freeOption.addClass('tomc-events--option-selected');
    this.freeOption.attr('aria-label', 'this option is not selected');
    this.ticketOption.attr('aria-label', 'this option is selected');
    this.requiresTicket = true;
    this.ticketSection.addClass('hidden');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-limit-ticket-reminder').addClass('hidden');
  }
  selectTicketOption() {
    this.freeOption.removeClass('tomc-events--option-selected');
    this.ticketOption.addClass('tomc-events--option-selected');
    this.ticketOption.attr('aria-label', 'this option is not selected');
    this.freeOption.attr('aria-label', 'this option is selected');
    this.requiresTicket = false;
    this.ticketSection.removeClass('hidden');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-limit-ticket-reminder').removeClass('hidden');
  }
  selectUnlimitedOption() {
    this.limitedOption.removeClass('tomc-events--option-selected');
    this.unlimitedOption.addClass('tomc-events--option-selected');
    this.unlimitedOption.attr('aria-label', 'this option is not selected');
    this.limitedOption.attr('aria-label', 'this option is selected');
    this.isLimited = false;
    this.limitSection.addClass('hidden');
  }
  selectLimitedOption() {
    this.unlimitedOption.removeClass('tomc-events--option-selected');
    this.limitedOption.addClass('tomc-events--option-selected');
    this.limitedOption.attr('aria-label', 'this option is not selected');
    this.unlimitedOption.attr('aria-label', 'this option is selected');
    this.isLimited = true;
    this.limitSection.removeClass('hidden');
  }
  selectMembersOnlyOption() {
    this.openOption.removeClass('tomc-events--option-selected');
    this.membersOnlyOption.addClass('tomc-events--option-selected');
    this.openOption.attr('aria-label', 'this option is not selected');
    this.membersOnlyOption.attr('aria-label', 'this option is selected');
    this.isMembersOnly = true;
  }
  selectOpenOption() {
    this.membersOnlyOption.removeClass('tomc-events--option-selected');
    this.openOption.addClass('tomc-events--option-selected');
    this.membersOnlyOption.attr('aria-label', 'this option is not selected');
    this.openOption.attr('aria-label', 'this option is selected');
    this.isMembersOnly = true;
  }
  selectTimeZone(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-event-time-zone-option').removeClass('tomc-events--option-selected');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('tomc-events--option-selected');
    this.chosenTimeZone = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).attr('html');
  }
  getRegisteredEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingRegisteredEvents',
      type: 'GET',
      success: response => {
        this.upcomingRegisteredEventsSpan.addClass('hidden');
        this.upcomingRegisteredEventsSpan.removeClass('purple-span');
        let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').addClass('centered-text').html("Events I'm Planning to Attend");
        this.upcomingRegisteredEventsSection.append(newHeading);
        if (response.length > 0) {
          let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
          this.upcomingRegisteredEventsSection.append(newSection);
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
            let newLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('orange-yellow-line-break-30');
            newSection.append(newLine);
          }
        } else {
          let newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html('You currently have no upcoming events.');
          this.upcomingEventsContainer.append(newP);
        }
      },
      failure: response => {
        console.log(response);
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyEvents);

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
/* harmony import */ var _modules_My_Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/My-Events */ "./src/modules/My-Events.js");
/* harmony import */ var _modules_Event_Archive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Event-Archive */ "./src/modules/Event-Archive.js");
/* harmony import */ var _modules_Add_Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Add-Event */ "./src/modules/Add-Event.js");



const tomcMyEvents = new _modules_My_Events__WEBPACK_IMPORTED_MODULE_0__["default"]();
const tomcEventArchive = new _modules_Event_Archive__WEBPACK_IMPORTED_MODULE_1__["default"]();
const tomcAddEvent = new _modules_Add_Event__WEBPACK_IMPORTED_MODULE_2__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map