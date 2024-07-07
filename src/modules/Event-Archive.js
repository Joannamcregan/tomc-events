import $ from 'jquery';

class EventArchive{
    constructor(){
        this.getUpcomingEventsButton = $('#tomc-upcoming-events-button');
        this.getPastEventsButton = $('#tomc-past-events-button');
        this.upcomingEventsContainer = $('#tomc-upcoming-events-section');
        this.pastEventsContainer = $('#tomc-past-events-section');
        this.events();
    }

    events(){
        this.getUpcomingEventsButton.on('click', this.getUpcomingEvents.bind(this));
        this.getPastEventsButton.on('click', this.getPastEvents.bind(this));
    }
    
    getUpcomingEvents(){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEvents',
            type: 'GET',
            success: (response) => {
                console.log(response);
                if (response.length > 0){
                    this.getUpcomingEventsButton.addClass('hidden');
                    this.getUpcomingEventsButton.removeClass('purple-button');
                }
            },
            failure: (response) => {
                console.log(response);
            }
        })
    }

    getPastEvents(){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getPastEvents',
            type: 'GET',
            success: (response) => {
                console.log(response);
                if (response.length > 0){
                    this.getPastEventsButton.addClass('hidden');
                    this.getPastEventsButton.removeClass('blue-button');
                    let newHeading = $('<h2/>').addClass('centered-text').html('Past Events');
                    this.pastEventsContainer.append(newHeading);
                    for (let i = 0; i < response.length; i++){

                    }
                }
            },
            failure: (response) => {
                console.log(response);
            }
        })
    }
}

export default EventArchive;