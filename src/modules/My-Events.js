import $ from 'jquery';

class MyEvents{
    constructor(){
        this.addEventSpan = $('#tomc-add-event-span');
        this.addEventSection = $('#tomc-new-event-section');
        this.upcomingRegisteredEventsSpan = $('#upcoming-registered-events-span');
        this.upcomingRegisteredEventsSection = $('#tomc-registered-events-section');
        this.manageUpcomingEventsSpan = $('#manage-upcoming-events-span');
        this.manageUpcomingEventsSection = $('#tomc-manage-upcoming-events-section');
        this.managePastEventsSpan = $('#manage-past-events-span');
        this.managePastEventsSection = $('#tomc-manage-past-events-section');
        this.freeOption = $('#tomc-event-free-option');
        this.ticketOption = $('#tomc-event-ticket-option');
        this.ticketSection = $('#tomc-new-event-ticket-section');
        this.ticketProductSelect = $('#tomc-event-ticket-product');
        this.eventTitle = $('#tomc-new-event-title');
        this.eventDate = $('#tomc-new-event-date');
        this.eventTime = $('#tomc-new-event-time');
        this.timeZoneOptions = $('.tomc-event-time-zone-option');
        this.eventDescription = $('#tomc-new-event-description');
        this.membersOnlyOption = $('#tomc-new-event-members-only-option');
        this.openOption = $('#tomc-new-event-open-option');
        this.limitSection = $('#tomc-new-event-limit-section');
        this.limitedOption = $('#tomc-new-event-limited-option');
        this.unlimitedOption = $('#tomc-new-event-unlimited-option');
        this.eventLimit = $('#tomc-event-limit');
        this.eventBridgeOption = $('#tomc-event-bridge-option');
        this.otherPlatformOption = $('#tomc-event-outside-option');
        this.ticketLimitReminder = $('#tomc-event-limit-ticket-reminder');
        this.submitButton = $('#tomc-new-event-submit');
        this.attendanceOverlay = $('#tomc-events-attendance-overlay');
        this.attendanceOverlayBody = $('#tomc-events__attendance-overlay-body');
        this.attendanceOverlayClose = $('#tomc-events__attendance-overlay-close');
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

    events(){
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
        this.attendanceOverlayClose.on('click', this.closeAttendanceOverlay.bind(this));
    }

    managePastEvents(){
        this.managePastEventsSpan.addClass('contracting');
        setTimeout(()=> {
            this.managePastEventsSpan.removeClass('contracting');
            this.managePastEventsSpan.toggleClass('hollow-blue-span');
            this.managePastEventsSpan.toggleClass('blue-span');
            this.managePastEventsSection.toggleClass('hidden');
        }, 2000);
        if (this.managePastEventsAdded == false){
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getPastEventsByOrganizer',
                type: 'GET',
                success: (response) => {   
                    if (response.length > 0){            
                        let newSection = $('<div/>').addClass('generic-content');
                        this.managePastEventsSection.append(newSection);           
                        for (let i = 0; i < response.length; i++){
                            let h2 = $('<h2/>').html(response[i]['post_title']);
                            newSection.append(h2);
                            let button = $('<button/>').addClass('small-blue-button attendance-button').html('record attendance').attr('data-event', response[i]['id']).on('click', this.openAttendanceOverlay.bind(this, response[i]['post_title'], response[i]['id']));
                            newSection.append(button);
                            let newLine = $('<div/>').addClass('orange-yellow-line-break-30');
                            newSection.append(newLine);
                        }
                    } else {
                        let p = $('<p/>').addClass('centered-text').html("It doesn't look like you're organizing any upcoming events right now.");
                        this.manageUpcomingEventsSection.append(p);
                    } 
                    this.managePastEventsAdded = true;
                },
                error: (response) => {
                    console.log(response);
                }
            });
        }
    }
    
    manageUpcomingOrganizedEvents(){
        this.manageUpcomingEventsSpan.addClass('contracting');
        setTimeout(()=> {
            this.manageUpcomingEventsSpan.removeClass('contracting');
            this.manageUpcomingEventsSpan.toggleClass('hollow-orange-span');
            this.manageUpcomingEventsSpan.toggleClass('orange-span');
            this.manageUpcomingEventsSection.toggleClass('hidden');
        }, 2000);
        if (this.manageUpcomingEventsAdded == false){
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEventsByOrganizer',
                type: 'GET',
                success: (response) => {               
                    if (response.length > 0){            
                        let newSection = $('<div/>').addClass('generic-content');
                        this.manageUpcomingEventsSection.append(newSection);           
                        for (let i = 0; i < response.length; i++){
                            let h2 = $('<h2/>').html(response[i]['post_title']);
                            newSection.append(h2);
                            let p = $('<p/>');
                            let strong = '';
                            if (response[i]['post_status'] == 'publish'){
                                strong = $('<strong/>').html('Approved by admin');
                            } else if (response[i]['post_status'] == 'draft'){
                                strong = $('<strong/>').html('Awaiting admin approval');
                            } else {
                                strong = $('<strong/>').html('Not approved by admin');
                            }
                            p.append(strong);
                            newSection.append(p);
                            p = $('<p/>');
                            let em = $('<em/>').html('schedulted for ' + response[i]['time_string']);
                            p.append(em);
                            newSection.append(p);
                            p = $('<p/>').html(response[i]['post_content']);
                            newSection.append(p);
                            let button = $('<button/>').addClass('small-red-button cancel-event').html('cancel event').attr('data-event', response[i]['id']);
                            newSection.append(button);
                            let newLine = $('<div/>').addClass('orange-yellow-line-break-30');
                            newSection.append(newLine);
                        }
                    } else {
                        let p = $('<p/>').addClass('centered-text').html("It doesn't look like you're organizing any upcoming events right now.");
                        this.manageUpcomingEventsSection.append(p);
                    } 
                    this.manageUpcomingEventsAdded = true;
                },
                error: (response) => {
                    console.log(response);
                }
            });
        }              
    }

    addNewEvent(){
        this.addEventSpan.addClass('contracting');
        setTimeout(()=> {
            this.addEventSpan.removeClass('contracting');
            this.addEventSection.toggleClass('hidden');        
            this.addEventSpan.toggleClass('hollow-purple-span');
            this.addEventSpan.toggleClass('purple-span');
        }, 2000);
    }   
    
    submitNewEvent(){
        if (this.eventTitle.val() != '' && (this.ticketProductSelect.val() != 0 || this.requiresTicket == false) && this.eventDate.val() != '' && this.eventTime.val() != '' && this.eventDescription.val() != '' && (this.eventLimit.val() != '' || this.isLimited == false)){
            $('#tomc-events-no-product-error').addClass('hidden');
            $('#tomc-events-no-title-error').addClass('hidden');
            $('#tomc-events-no-date-error').addClass('hidden');
            $('#tomc-events-no-time-error').addClass('hidden');
            $('#tomc-events-no-description-error').addClass('hidden');
            $('#tomc-events-no-limit-error').addClass('hidden');
            let timeString;
            if (parseInt(this.eventTime.val().substring(0,2)) == 12){
                timeString = this.eventTime.val() + ' PM'
            } else if (parseInt(this.eventTime.val().substring(0,2)) > 12){
                timeString = (parseInt(this.eventTime.val().substring(0,2)) - 12) + this.eventTime.val().substring(2) + ' PM'
            } else if (parseInt(this.eventTime.val().substring(0,2)) == 0){
                timeString = '12' + this.eventTime.val().substring(2) + ' AM'
            } else {
                timeString = this.eventTime.val() + ' AM'
            }
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/submitNewEvent',
                type: 'POST',
                data: {
                    'title' : this.eventTitle.val().substring(0, 200),
                    'product' : this.ticketProductSelect.val(),
                    'date' : this.eventDate.val(),
                    'time' : timeString,
                    'timezone' : this.chosenTimeZone,
                    'description' : this.eventDescription.val(),
                    'limit' : this.eventLimit.val(),
                    'requiresTicket' : this.requiresTicket,
                    'isLimited' : this.isLimited,
                    'isMembersOnly' : this.isMembersOnly,
                    'isOnBridge' : this.isBridge
                },
                success: (response) => {
                    if (response > 0){
                        $("#tomc-submit-event-success").removeClass('hidden');
                        setTimeout(() => location.reload(true), 3000);
                    } else {
                        $("#tomc-submit-event-failure").removeClass('hidden');
                    }
                },
                error: (response) => {
                    $("#tomc-submit-event-failure").removeClass('hidden');
                }
            });
        } else {
            if (this.ticketProductSelect.val() == ''){
                $('#tomc-events-no-product-error').removeClass('hidden');
            } else {
                $('#tomc-events-no-product-error').addClass('hidden');
            }
            if (this.eventTitle.val() == ''){
                $('#tomc-events-no-title-error').removeClass('hidden');
            } else {
                $('#tomc-events-no-title-error').addClass('hidden');
            }
            if (this.eventDate.val() == ''){
                $('#tomc-events-no-date-error').removeClass('hidden');
            } else {
                $('#tomc-events-no-date-error').addClass('hidden');
            }
            if (this.eventTime.val() == ''){
                $('#tomc-events-no-time-error').removeClass('hidden');
            } else {
                $('#tomc-events-no-time-error').addClass('hidden');
            }
            if (this.eventDescription.val() == ''){
                $('#tomc-events-no-description-error').removeClass('hidden');
            } else {
                $('#tomc-events-no-description-error').addClass('hidden');
            }
            if (this.eventLimit.val() == 0 && this.isLimited){
                $('#tomc-events-no-limit-error').removeClass('hidden');
            } else {
                $('#tomc-events-no-limit-error').addClass('hidden');
            }
        }
    }

    openAttendanceOverlay(eventTitle, eventId, e){
        this.upcomingRegisteredEventsSpan.addClass('contracting');
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/checkAttendanceRecord',
            type: 'GET',
            data: {
                'event' : $(e.target).data('event')
            },
            success: (response) => {         
                this.attendanceOverlay.removeClass('hidden');
                this.attendanceOverlay.addClass('search-overlay--active');      
                if (response.length > 0){                    
                    console.log(response);
                    let instructions = $('<p/>').addClass('centered-text').html('Our records show that the following people attended ' + eventTitle + '. If you need to correct this record, please reach out to admin.')
                    this.attendanceOverlayBody.append(instructions);
                    let attendees = $('<div/>').addClass('generic-content');
                    this.attendanceOverlayBody.append(attendees);
                    for (let i = 0; i < response.length; i++){
                        let attendee = $('<p/>').html(response[i]['display_name'] + ' (' + response[i]['user_email'] + ')');
                        attendees.append(attendee);
                    }
                } else {
                    $.ajax({
                        beforeSend: (xhr) => {
                            xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                        },
                        url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getAttendeesByEvent',
                        type: 'GET',
                        data: {
                            'event' : $(e.target).data('event')
                        },
                        success: (response) => {
                            this.attendanceOverlay.removeClass('hidden');
                            this.attendanceOverlay.addClass('search-overlay--active');
                            let instructions = $('<p/>').addClass('centered-text').html('Please check the box next to each person who attended ' + eventTitle + '.')
                            this.attendanceOverlayBody.append(instructions);
                            let registrantsSection = $('<div/>').addClass('generic-content');
                            this.attendanceOverlayBody.append(registrantsSection);
                            if (response.length > 0){                    
                                console.log(response);
                                for (let i = 0; i < response.length; i++){
                                    let checkbox = $('<input />').addClass('tomc-event-attendee-checkbox').attr('type', 'checkbox').attr('id', 'tomc-event-registrant-id-' + response[i]['id']).val(response[i]['id']);
                                    registrantsSection.append(checkbox);
                                    let checkboxLabel = $('<label />').addClass('tomc-book-organization--large-label').attr('for', 'tomc-event-registrant-id-' + response[i]['id']).html(response[i]['display_name'] + ' (' + response[i]['user_email'] + ')');
                                    registrantsSection.append(checkboxLabel);
                                }
                                let submitAttendeesButton = $('<button/>').attr('data-event-id', eventId).addClass('purple-button').html('submit records').on('click', this.submitAttendees.bind(this));
                                this.attendanceOverlayBody.append(submitAttendeesButton);
                            } else {
                                console.log(response);
                            }
                        },
                        failure: (response) => {
                            console.log(response);
                        }
                    })
                }
            },
            failure: (response) => {
                console.log(response);
            }
        })
    }

    submitAttendees(e){
        var attendeesToAdd = [];
        $('.tomc-event-attendee-checkbox:checkbox:checked').each(function(){
            attendeesToAdd.push(parseInt($(this).val()));
        });
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/submitAttendees',
            type: 'GET',
            data: {
                'attendees' : JSON.stringify(attendeesToAdd),
                'eventId' : $(e.target).data('event-id')
            },
            success: () => {
                this.attendanceOverlayBody.html('Thank you for submitting the attendance record.');
                setTimeout(() => location.reload(true), 3000);
            },
            failure: (response) => {
                console.log(response);
            }
        })
    }

    selectFreeOption(){
        this.ticketOption.removeClass('tomc-events--option-selected');
        this.freeOption.addClass('tomc-events--option-selected');
        this.freeOption.attr('aria-label', 'this option is not selected');
        this.ticketOption.attr('aria-label', 'this option is selected');
        this.requiresTicket = true;
        this.ticketSection.addClass('hidden');
        $('#tomc-event-limit-ticket-reminder').addClass('hidden');
    }

    selectTicketOption(){
        this.freeOption.removeClass('tomc-events--option-selected');
        this.ticketOption.addClass('tomc-events--option-selected');
        this.ticketOption.attr('aria-label', 'this option is not selected');
        this.freeOption.attr('aria-label', 'this option is selected');
        this.requiresTicket = false;
        this.ticketSection.removeClass('hidden');
        $('#tomc-event-limit-ticket-reminder').removeClass('hidden');
    }

    selectUnlimitedOption(){
        this.limitedOption.removeClass('tomc-events--option-selected');
        this.unlimitedOption.addClass('tomc-events--option-selected');
        this.unlimitedOption.attr('aria-label', 'this option is not selected');
        this.limitedOption.attr('aria-label', 'this option is selected');
        this.isLimited = false;
        this.limitSection.addClass('hidden');
    }

    selectLimitedOption(){
        this.unlimitedOption.removeClass('tomc-events--option-selected');
        this.limitedOption.addClass('tomc-events--option-selected');
        this.limitedOption.attr('aria-label', 'this option is not selected');
        this.unlimitedOption.attr('aria-label', 'this option is selected');
        this.isLimited = true;
        this.limitSection.removeClass('hidden');
    }

    selectMembersOnlyOption(){
        this.openOption.removeClass('tomc-events--option-selected');
        this.membersOnlyOption.addClass('tomc-events--option-selected');
        this.openOption.attr('aria-label', 'this option is not selected');
        this.membersOnlyOption.attr('aria-label', 'this option is selected');
        this.isMembersOnly = true;
    }

    selectOpenOption(){
        this.membersOnlyOption.removeClass('tomc-events--option-selected');
        this.openOption.addClass('tomc-events--option-selected');
        this.membersOnlyOption.attr('aria-label', 'this option is not selected');
        this.openOption.attr('aria-label', 'this option is selected');
        this.isMembersOnly = false;
    }

    selectBridgeOption(){
        this.otherPlatformOption.removeClass('tomc-events--option-selected');
        this.eventBridgeOption.addClass('tomc-events--option-selected');
        this.otherPlatformOption.attr('aria-label', 'this option is not selected');
        this.eventBridgeOption.attr('aria-label', 'this option is selected');
        this.isBridge = true;
    }

    selectOtherPlatformOption(){
        this.eventBridgeOption.removeClass('tomc-events--option-selected');
        this.otherPlatformOption.addClass('tomc-events--option-selected');
        this.eventBridgeOption.attr('aria-label', 'this option is not selected');
        this.otherPlatformOption.attr('aria-label', 'this option is selected');
        this.isMembersOnly = false;
    }

    selectTimeZone(e){
        $('.tomc-event-time-zone-option').removeClass('tomc-events--option-selected');
        $(e.target).addClass('tomc-events--option-selected');
        this.chosenTimeZone = $(e.target).text();
    }

    closeAttendanceOverlay(){
        this.attendanceOverlayBody.html('');
        this.attendanceOverlay.removeClass('search-overlay--active');
        this.attendanceOverlay.addClass('hidden');
    }

    getRegisteredEvents(){
        this.upcomingRegisteredEventsSpan.addClass('contracting');
        setTimeout(()=> {
            this.upcomingRegisteredEventsSpan.removeClass('contracting');
            this.upcomingRegisteredEventsSpan.toggleClass('hollow-purple-span');
            this.upcomingRegisteredEventsSpan.toggleClass('purple-span');
            this.upcomingRegisteredEventsSection.toggleClass('hidden');
        }, 2000);
        if (this.registeredEventsAdded == false){
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingRegisteredEvents',
                type: 'GET',
                success: (response) => {
                    if (response.length > 0){               
                        let newSection = $('<div/>').addClass('generic-content');
                        this.upcomingRegisteredEventsSection.append(newSection);
                        for (let i = 0; i < response.length; i++){
                            let newLink = $('<a/>').attr('href', response[i]['post_url']);
                            let newHeading = $('<h2/>').html(response[i]['post_title']);
                            newLink.append(newHeading);
                            newSection.append(newLink);
                            let newP = $('<p/>');
                            let newEm = $('<strong/>').html('scheduled for ' + response[i]['time_string']);
                            newP.append(newEm);
                            newSection.append(newP);
                            newP = $('<p/>').html(response[i]['post_content']);
                            newSection.append(newP);
                            let newLine = $('<div/>').addClass('orange-yellow-line-break-30');
                            newSection.append(newLine);
                        }
                    } else {
                        $('#no-registered-events-error').removeClass('hidden');
                    }
                    this.registeredEventsAdded = true;
                },
                failure: (response) => {
                    console.log(response);
                }
            })
        }
    }
}

export default MyEvents;