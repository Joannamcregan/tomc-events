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
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('hidden');
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('purple-span');
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
    this.myEventsLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-my-events-link');
    this.events();
    this.upcomingEventsAdded = false;
    this.pastEventsAdded = false;
  }
  events() {
    this.getUpcomingEventsSpan.on('click', this.getUpcomingEvents.bind(this));
    this.getPastEventsSpan.on('click', this.getPastEvents.bind(this));
    this.myEventsLink.on('click', this.animateSpan.bind(this));
  }
  animateSpan() {
    this.myEventsLink.children('span').addClass('contracting');
  }
  getUpcomingEvents() {
    this.getUpcomingEventsSpan.addClass('contracting');
    setTimeout(() => {
      this.getUpcomingEventsSpan.removeClass('contracting');
      this.getUpcomingEventsSpan.toggleClass('hollow-purple-span');
      this.getUpcomingEventsSpan.toggleClass('purple-span');
      this.upcomingEventsContainer.toggleClass('hidden');
    }, 2000);
    if (this.upcomingEventsAdded == false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEvents',
        type: 'GET',
        success: response => {
          if (response.length > 0) {
            let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
            this.upcomingEventsContainer.append(newSection);
            for (let i = 0; i < response.length; i++) {
              let newLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a/>').attr('href', response[i]['post_url']);
              let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').html(response[i]['post_title']);
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
          this.upcomingEventsAdded = true;
        },
        failure: response => {
          console.log(response);
        }
      });
    }
  }
  getPastEvents() {
    this.getPastEventsSpan.addClass('contracting');
    setTimeout(() => {
      this.getPastEventsSpan.removeClass('contracting');
      this.getPastEventsSpan.toggleClass('hollow-blue-span');
      this.getPastEventsSpan.toggleClass('blue-span');
      this.pastEventsContainer.toggleClass('hidden');
    }, 2000);
    if (this.pastEventsAdded == false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getPastEvents',
        type: 'GET',
        success: response => {
          if (response.length > 0) {
            let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
            this.pastEventsContainer.append(newSection);
            for (let i = 0; i < response.length; i++) {
              let newLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a/>').attr('href', response[i]['post_url']);
              let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').html(response[i]['post_title']);
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
          this.pastEventsAdded = true;
        },
        failure: response => {
          console.log(response);
        }
      });
    }
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
    this.eventBridgeOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-bridge-option');
    this.otherPlatformOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-outside-option');
    this.ticketLimitReminder = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-event-limit-ticket-reminder');
    this.submitButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-new-event-submit');
    this.attendanceOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-attendance-overlay');
    this.events();
    this.requiresTicket = false;
    this.isMembersOnly = false;
    this.chosenTimeZone = 'Hawaii Time';
    this.isLimited = false;
    this.isBridge = true;
    this.registeredEventsAdded = false;
    this.manageUpcomingEventsAdded = false;
    this.managePastEventsAdded = false;
  }
  events() {
    this.manageUpcomingEventsSpan.on('click', this.manageUpcomingOrganizedEvents.bind(this));
    this.addEventSpan.on('click', this.addNewEvent.bind(this));
    this.upcomingRegisteredEventsSpan.on('click', this.getRegisteredEvents.bind(this));
    this.managePastEventsSpan.on('click', this.managePastEvents.bind(this));
    this.freeOption.on('click', this.selectFreeOption.bind(this));
    this.ticketOption.on('click', this.selectTicketOption.bind(this));
    this.membersOnlyOption.on('click', this.selectMembersOnlyOption.bind(this));
    this.openOption.on('click', this.selectOpenOption.bind(this));
    this.timeZoneOptions.on('click', this.selectTimeZone.bind(this));
    this.unlimitedOption.on('click', this.selectUnlimitedOption.bind(this));
    this.limitedOption.on('click', this.selectLimitedOption.bind(this));
    this.eventBridgeOption.on('click', this.selectBridgeOption.bind(this));
    this.otherPlatformOption.on('click', this.selectOtherPlatformOption.bind(this));
    this.submitButton.on('click', this.submitNewEvent.bind(this));
  }
  managePastEvents() {
    this.managePastEventsSpan.addClass('contracting');
    setTimeout(() => {
      this.managePastEventsSpan.removeClass('contracting');
      this.managePastEventsSpan.toggleClass('hollow-blue-span');
      this.managePastEventsSpan.toggleClass('blue-span');
      this.managePastEventsSection.toggleClass('hidden');
    }, 2000);
    if (this.managePastEventsAdded == false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getPastEventsByOrganizer',
        type: 'GET',
        success: response => {
          if (response.length > 0) {
            let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
            this.managePastEventsSection.append(newSection);
            for (let i = 0; i < response.length; i++) {
              let h2 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').html(response[i]['post_title']);
              newSection.append(h2);
              let button = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button/>').addClass('small-blue-button attendance-button').html('record attendance').attr('data-event', response[i]['id']).on('click', this.openAttendanceOverlay.bind(this, response[i]['post_title']));
              newSection.append(button);
              let newLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('orange-yellow-line-break-30');
              newSection.append(newLine);
            }
          } else {
            let p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html("It doesn't look like you're organizing any upcoming events right now.");
            this.manageUpcomingEventsSection.append(p);
          }
          this.managePastEventsAdded = true;
        },
        error: response => {
          console.log(response);
        }
      });
    }
  }
  manageUpcomingOrganizedEvents() {
    this.manageUpcomingEventsSpan.addClass('contracting');
    setTimeout(() => {
      this.manageUpcomingEventsSpan.removeClass('contracting');
      this.manageUpcomingEventsSpan.toggleClass('hollow-orange-span');
      this.manageUpcomingEventsSpan.toggleClass('orange-span');
      this.manageUpcomingEventsSection.toggleClass('hidden');
    }, 2000);
    if (this.manageUpcomingEventsAdded == false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEventsByOrganizer',
        type: 'GET',
        success: response => {
          if (response.length > 0) {
            let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
            this.manageUpcomingEventsSection.append(newSection);
            for (let i = 0; i < response.length; i++) {
              let h2 = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').html(response[i]['post_title']);
              newSection.append(h2);
              let p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>');
              let strong = '';
              if (response[i]['post_status'] == 'publish') {
                strong = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong/>').html('Approved by admin');
              } else if (response[i]['post_status'] == 'draft') {
                strong = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong/>').html('Awaiting admin approval');
              } else {
                strong = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong/>').html('Not approved by admin');
              }
              p.append(strong);
              newSection.append(p);
              p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>');
              let em = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<em/>').html('schedulted for ' + response[i]['time_string']);
              p.append(em);
              newSection.append(p);
              p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html(response[i]['post_content']);
              newSection.append(p);
              let button = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button/>').addClass('small-red-button cancel-event').html('cancel event').attr('data-event', response[i]['id']);
              newSection.append(button);
              let newLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('orange-yellow-line-break-30');
              newSection.append(newLine);
            }
          } else {
            let p = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html("It doesn't look like you're organizing any upcoming events right now.");
            this.manageUpcomingEventsSection.append(p);
          }
          this.manageUpcomingEventsAdded = true;
        },
        error: response => {
          console.log(response);
        }
      });
    }
  }
  addNewEvent() {
    this.addEventSpan.addClass('contracting');
    setTimeout(() => {
      this.addEventSpan.removeClass('contracting');
      this.addEventSection.toggleClass('hidden');
      this.addEventSpan.toggleClass('hollow-purple-span');
      this.addEventSpan.toggleClass('purple-span');
    }, 2000);
  }
  submitNewEvent() {
    if (this.eventTitle.val() != '' && (this.ticketProductSelect.val() != 0 || this.requiresTicket == false) && this.eventDate.val() != '' && this.eventTime.val() != '' && this.eventDescription.val() != '' && (this.eventLimit.val() != '' || this.isLimited == false)) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-product-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-title-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-date-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-time-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-description-error').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-limit-error').addClass('hidden');
      let timeString;
      if (parseInt(this.eventTime.val().substring(0, 2)) == 12) {
        timeString = this.eventTime.val() + ' PM';
      } else if (parseInt(this.eventTime.val().substring(0, 2)) > 12) {
        timeString = parseInt(this.eventTime.val().substring(0, 2)) - 12 + this.eventTime.val().substring(2) + ' PM';
      } else if (parseInt(this.eventTime.val().substring(0, 2)) == 0) {
        timeString = '12' + this.eventTime.val().substring(2) + ' AM';
      } else {
        timeString = this.eventTime.val() + ' AM';
      }
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/submitNewEvent',
        type: 'POST',
        data: {
          'title': this.eventTitle.val().substring(0, 200),
          'product': this.ticketProductSelect.val(),
          'date': this.eventDate.val(),
          'time': timeString,
          'timezone': this.chosenTimeZone,
          'description': this.eventDescription.val(),
          'limit': this.eventLimit.val(),
          'requiresTicket': this.requiresTicket,
          'isLimited': this.isLimited,
          'isMembersOnly': this.isMembersOnly,
          'isOnBridge': this.isBridge
        },
        success: response => {
          if (response > 0) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#tomc-submit-event-success").removeClass('hidden');
            setTimeout(() => location.reload(true), 3000);
          } else {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#tomc-submit-event-failure").removeClass('hidden');
          }
        },
        error: response => {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()("#tomc-submit-event-failure").removeClass('hidden');
        }
      });
    } else {
      if (this.ticketProductSelect.val() == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-product-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-product-error').addClass('hidden');
      }
      if (this.eventTitle.val() == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-title-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-title-error').addClass('hidden');
      }
      if (this.eventDate.val() == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-date-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-date-error').addClass('hidden');
      }
      if (this.eventTime.val() == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-time-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-time-error').addClass('hidden');
      }
      if (this.eventDescription.val() == '') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-description-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-description-error').addClass('hidden');
      }
      if (this.eventLimit.val() == 0 && this.isLimited) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-limit-error').removeClass('hidden');
      } else {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-events-no-limit-error').addClass('hidden');
      }
    }
  }
  openAttendanceOverlay(eventTitle, e) {
    this.upcomingRegisteredEventsSpan.addClass('contracting');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/checkAttendanceRecord',
      type: 'GET',
      data: {
        'event': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('event')
      },
      success: response => {
        this.attendanceOverlay.removeClass('hidden');
        this.attendanceOverlay.addClass('search-overlay--active');
        if (response.length > 0) {
          console.log(response);
          let instructions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html('Our records show that the following people attended ' + eventTitle + '. If you need to correct this record, please reach out to admin.');
          this.attendanceOverlay.append(instructions);
        } else {
          jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
            beforeSend: xhr => {
              xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getAttendeesByEvent',
            type: 'GET',
            data: {
              'event': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('event')
            },
            success: response => {
              this.attendanceOverlay.removeClass('hidden');
              this.attendanceOverlay.addClass('search-overlay--active');
              let instructions = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').addClass('centered-text').html('Please check the box next to each person who attended ' + eventTitle + '.');
              this.attendanceOverlay.append(instructions);
              let registrantsSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
              this.attendanceOverlay.append(registrantsSection);
              if (response.length > 0) {
                console.log(response);
                for (let i = 0; i < response.length; i++) {
                  let checkbox = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input />').attr('type', 'checkbox').attr('id', 'tomc-event-registrant-id-' + response[i]['id']).val(response[i]['id']);
                  registrantsSection.append(checkbox);
                  let checkboxLabel = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<label />').addClass('tomc-book-organization--large-label').attr('for', 'tomc-event-registrant-id-' + response[i]['id']).html(response[i]['display_name'] + ' (' + response[i]['user_email'] + ')');
                  registrantsSection.append(checkboxLabel);
                }
                let submitAttendeesButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button/>').addClass('purple-button').html('submit records').on('click', this.submitAttendees.bind(this));
                this.attendanceOverlay.append(submitAttendeesButton);
              } else {
                console.log(response);
              }
            },
            failure: response => {
              console.log(response);
            }
          });
        }
      },
      failure: response => {
        console.log(response);
      }
    });
  }
  submitAttendees() {
    console.log('submitting those attendees');
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
    this.isMembersOnly = false;
  }
  selectBridgeOption() {
    this.otherPlatformOption.removeClass('tomc-events--option-selected');
    this.eventBridgeOption.addClass('tomc-events--option-selected');
    this.otherPlatformOption.attr('aria-label', 'this option is not selected');
    this.eventBridgeOption.attr('aria-label', 'this option is selected');
    this.isBridge = true;
  }
  selectOtherPlatformOption() {
    this.eventBridgeOption.removeClass('tomc-events--option-selected');
    this.otherPlatformOption.addClass('tomc-events--option-selected');
    this.eventBridgeOption.attr('aria-label', 'this option is not selected');
    this.otherPlatformOption.attr('aria-label', 'this option is selected');
    this.isMembersOnly = false;
  }
  selectTimeZone(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tomc-event-time-zone-option').removeClass('tomc-events--option-selected');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('tomc-events--option-selected');
    this.chosenTimeZone = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).text();
  }
  getRegisteredEvents() {
    this.upcomingRegisteredEventsSpan.addClass('contracting');
    setTimeout(() => {
      this.upcomingRegisteredEventsSpan.removeClass('contracting');
      this.upcomingRegisteredEventsSpan.toggleClass('hollow-purple-span');
      this.upcomingRegisteredEventsSpan.toggleClass('purple-span');
      this.upcomingRegisteredEventsSection.toggleClass('hidden');
    }, 2000);
    if (this.registeredEventsAdded == false) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingRegisteredEvents',
        type: 'GET',
        success: response => {
          if (response.length > 0) {
            let newSection = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('generic-content');
            this.upcomingRegisteredEventsSection.append(newSection);
            for (let i = 0; i < response.length; i++) {
              let newLink = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<a/>').attr('href', response[i]['post_url']);
              let newHeading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>').html(response[i]['post_title']);
              newLink.append(newHeading);
              newSection.append(newLink);
              let newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>');
              let newEm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<strong/>').html('scheduled for ' + response[i]['time_string']);
              newP.append(newEm);
              newSection.append(newP);
              newP = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p/>').html(response[i]['post_content']);
              newSection.append(newP);
              let newLine = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').addClass('orange-yellow-line-break-30');
              newSection.append(newLine);
            }
          } else {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#no-registered-events-error').removeClass('hidden');
          }
          this.registeredEventsAdded = true;
        },
        failure: response => {
          console.log(response);
        }
      });
    }
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