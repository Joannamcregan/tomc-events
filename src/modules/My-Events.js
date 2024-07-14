import $ from 'jquery';

class MyEvents{
    constructor(){
        //Add a new event---------------------------------------------------------------------------
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
        this.ticketLimitReminder = $('#tomc-event-limit-ticket-reminder');
        this.events();
        this.requiresTicket = false;
        this.isMembersOnly = false;
        this.chosenTimeZone = '';
        this.isLimited = false;
    }

    events(){
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
    
    addNewEvent(){
        this.addEventSection.removeClass('hidden');
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
        this.isMembersOnly = true;
    }

    selectTimeZone(e){
        $('.tomc-event-time-zone-option').removeClass('tomc-events--option-selected');
        $(e.target).addClass('tomc-events--option-selected');
        this.chosenTimeZone = $(e.target).attr('html');
    }

    getRegisteredEvents(){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingRegisteredEvents',
            type: 'GET',
            success: (response) => {
                this.upcomingRegisteredEventsSpan.addClass('hidden');
                this.upcomingRegisteredEventsSpan.removeClass('purple-span');
                let newHeading = $('<h2/>').addClass('centered-text').html("Events I'm Planning to Attend");
                this.upcomingRegisteredEventsSection.append(newHeading);
                if (response.length > 0){                    
                    let newSection = $('<div/>').addClass('generic-content');
                    this.upcomingRegisteredEventsSection.append(newSection);
                    for (let i = 0; i < response.length; i++){
                        let newLink = $('<a/>').attr('href', response[i]['post_url']);
                        newHeading = $('<h3/>').html(response[i]['post_title']);
                        newLink.append(newHeading);
                        newSection.append(newLink);
                        let newP = $('<p/>');
                        let newEm = $('<strong/>').html(response[i]['time_string']);
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
            },
            failure: (response) => {
                console.log(response);
            }
        })
    }
}

export default MyEvents;