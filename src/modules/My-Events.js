import $ from 'jquery';

class MyEvents{
    constructor(){
        //Add a new event---------------------------------------------------------------------------
        this.addEventSpan = $('#tomc-add-event-span');
        this.events();
    }

    events(){
        this.addEventSpan.on('click', this.addNewEvent.bind(this));
    }
    
    addNewEvent(){
        console.log('adding a new event');
    }
}

export default MyEvents;