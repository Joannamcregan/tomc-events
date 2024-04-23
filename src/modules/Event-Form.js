import $ from 'jquery';

class EventForms{
    constructor(){
        this.submit = $('.tomc-book-organization--display-penname-section');
        this.events();
    }

    events(){
        this.submit.on('click', this.showMessage.bind(this));
    }
    
    showMessage(){
        console.log('showing thank you message');
    }

    
}

export default EventForms;