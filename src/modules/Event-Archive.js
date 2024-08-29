import $ from 'jquery';

class EventArchive{
    constructor(){
        this.getUpcomingEventsSpan = $('#tomc-upcoming-events-span');
        this.getPastEventsSpan = $('#tomc-past-events-span');
        this.upcomingEventsContainer = $('#tomc-upcoming-events-section');
        this.pastEventsContainer = $('#tomc-past-events-section');
        this.myEventsLink = $('#tomc-my-events-link');
        this.events();
        this.upcomingEventsAdded = false;
        this.pastEventsAdded = false;
    }

    events(){
        this.getUpcomingEventsSpan.on('click', this.getUpcomingEvents.bind(this));
        this.getPastEventsSpan.on('click', this.getPastEvents.bind(this));
        this.myEventsLink.on('click', this.animateSpan.bind(this));
    }

    animateSpan(){
        this.myEventsLink.children('span').addClass('contracting');
    }
    
    getUpcomingEvents(){
        this.getUpcomingEventsSpan.addClass('contracting');
        setTimeout(()=> {
            this.getUpcomingEventsSpan.removeClass('contracting');
            this.getUpcomingEventsSpan.toggleClass('hollow-purple-span');
            this.getUpcomingEventsSpan.toggleClass('purple-span');
            this.upcomingEventsContainer.toggleClass('hidden');
        }, 2000);
        if (this.upcomingEventsAdded == false){
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getUpcomingEvents',
                type: 'GET',
                success: (response) => {
                    if (response.length > 0){                    
                        let newSection = $('<div/>').addClass('generic-content');
                        this.upcomingEventsContainer.append(newSection);
                        for (let i = 0; i < response.length; i++){
                            let newLink = $('<a/>').attr('href', response[i]['post_url']);
                            let newHeading = $('<h2/>').html(response[i]['post_title']);
                            newLink.append(newHeading);
                            newSection.append(newLink);
                            let newP = $('<p/>');
                            let newEm = $('<strong/>').html(response[i]['time_string']);
                            newP.append(newEm);
                            newSection.append(newP);
                            newP = $('<p/>').html(response[i]['post_content']);
                            newSection.append(newP);
                            if (response[i]['members_only'] == 1){
                                newP = $('<p/>').html('');
                                newEm = $('<em/>').html('members only');
                                newP.append(newEm);
                                newSection.append(newP);
                            }
                            let newLine = $('<div/>').addClass('orange-yellow-line-break-30');
                            newSection.append(newLine);
                        }
                    } else {
                        let newP = $('<p/>').addClass('centered-text').html('There are currently no upcoming events scheduled.');
                        this.upcomingEventsContainer.append(newP);
                    }
                    this.upcomingEventsAdded = true;
                },
                failure: (response) => {
                    console.log(response);
                }
            })
        }        
    }

    getPastEvents(){
        this.getPastEventsSpan.addClass('contracting');
        setTimeout(()=> {
            this.getPastEventsSpan.removeClass('contracting');
            this.getPastEventsSpan.toggleClass('hollow-blue-span');
            this.getPastEventsSpan.toggleClass('blue-span');
            this.pastEventsContainer.toggleClass('hidden');
        }, 2000);
        if (this.pastEventsAdded == false){
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/getPastEvents',
                type: 'GET',
                success: (response) => {
                    if (response.length > 0){
                        let newSection = $('<div/>').addClass('generic-content');
                        this.pastEventsContainer.append(newSection);
                        for (let i = 0; i < response.length; i++){
                            let newLink = $('<a/>').attr('href', response[i]['post_url']);
                            let newHeading = $('<h2/>').html(response[i]['post_title']);
                            newLink.append(newHeading);
                            newSection.append(newLink);
                            let newP = $('<p/>');
                            let newEm = $('<strong/>').html(response[i]['time_string']);
                            newP.append(newEm);
                            newSection.append(newP);
                            newP = $('<p/>').html(response[i]['post_content']);
                            newSection.append(newP);
                            if (response[i]['members_only'] == 1){
                                newP = $('<p/>').html('');
                                newEm = $('<em/>').html('members only');
                                newP.append(newEm);
                                newSection.append(newP);
                            }
                            let newLine = $('<div/>').addClass('orange-yellow-line-break-30');
                            newSection.append(newLine);
                        }
                    } else {
                        let newP = $('<p/>').addClass('centered-text').html("We haven't had any events yet!");
                        this.pastEventsContainer.append(newP);
                    }
                    this.pastEventsAdded = true;
                },
                failure: (response) => {
                    console.log(response);
                }
            })
        }        
    }
}

export default EventArchive;