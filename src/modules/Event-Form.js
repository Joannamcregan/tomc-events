import $ from 'jquery';

class EventForms{
    constructor(){
        //Add a new event---------------------------------------------------------------------------
        this.submitNewEventButton = $('#tomc--save-new-event');
        this.cancelNewEventButton = $('#tomc--cancel-new-event');
        this.newEventNameInput = $('#tomc-book-organization-new-event');
        this.newEventTextarea = $('#tomc-book-organization--new-event-details');
        this.displayEventTime = $('#tomc-events-time-entered');
        this.eventTimePicker = $('#tomc-event-date-time-picker');
        this.presenterSelect = $('#tomc-event-presenter-select');
        this.addPresenterButton = $('#tomc-event-attendance-add-presenter');
        this.eventPresenterContainer = $('#tomc-event-presentation-container');
        this.events();
    }

    events(){
        this.submitNewEventButton.on('click', this.submitNewEvent.bind(this));
        this.cancelNewEventButton.on('click', this.cancelNewEvent.bind(this));
    }
    
    submitNewEvent(){
        console.log('submitting new event');
    }
    
    cancelNewEvent(){
        this.newEventNameInput.val('');
        this.newEventTextarea.val('');
    }
}

export default EventForms;