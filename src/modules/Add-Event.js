import $ from 'jquery';

class AddEvent{
    constructor(){
        this.registerSpans = $('.tomc-event-register');
        this.events();
    }

    events(){
        this.registerSpans.on('click', this.register.bind(this));
    }

    register(e){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookorgData.root_url + '/wp-json/tomcEvents/v1/registerForEvent',
            type: 'POST',
            data: {
                'event' : $(e.target).data('post')
            },
            success: (response) => {
                if (response > 0){
                    $(e.target).parent().children('.tomc-registration-success').removeClass('hidden');
                    $(e.target).parent().children('.tomc-registration-fail').addClass('hidden');
                } else {
                    $(e.target).parent().children('.tomc-registration-success').addClass('hidden');
                    $(e.target).parent().children('.tomc-registration-fail').removeClass('hidden');
                }
            },
            failure: (response) => {
                console.log(response);
            }
        })
    }
}

export default AddEvent;