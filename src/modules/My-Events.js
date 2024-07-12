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
        this.events();
    }

    events(){
        this.addEventSpan.on('click', this.addNewEvent.bind(this));
        this.upcomingRegisteredEventsSpan.on('click', this.getRegisteredEvents.bind(this));
    }
    
    addNewEvent(){
        this.addEventSection.removeClass('hidden');
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