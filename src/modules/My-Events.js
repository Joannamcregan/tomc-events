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
                        for (let i = 0; i < response.length; i++){
                            let h2 = $('<h2/>').html(response[i]['post_title']).addClass('centered-text');
                            this.manageUpcomingEventsSection.append(h2);
                            let p = $('<p/>').addClass('centered-text');
                            let strong = '';
                            if (response[i]['post_status'] == 'publish'){
                                strong = $('<strong/>').html('Approved by admin');
                            } else if (response[i]['post_status'] == 'draft'){
                                strong = $('<strong/>').html('Awaiting admin approval');
                            } else {
                                strong = $('<strong/>').html('Not approved by admin');
                            }
                            p.append(strong);
                            this.manageUpcomingEventsSection.append(p);
                            p = $('<p/>').addClass('centered-text');
                            let em = $('<em/>').html(response[i]['time_string']);
                            p.append(em);
                            this.manageUpcomingEventsSection.append(p);
                            p = $('<p/>').html(response[i]['post_content']).addClass('centered-text');
                            this.manageUpcomingEventsSection.append(p);
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
                    'time' : this.eventTime.val(),
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
        console.log(this.chosenTimeZone);
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
                        let newP = $('<p/>').addClass('centered-text').html('You currently have no upcoming events.');
                        this.upcomingEventsContainer.append(newP);
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