<?php get_header();
// add new event
// --description, date string, event link string

// manage upcoming events
// --cancel upcoming events

// manage past events
// --record attendance
?><main>
    <div class="banner"><h1 class="centered-text">My Events</h1></div>
    <br>
    <?php if (is_user_logged_in(){
        ?><span class="purple-span" id="upcoming-registered-events-span">Upcoming Registered Events</span>
        <div id="tomc-registered-events-section">
    
        </div>
        <span class="orange-span" id="manage-upcoming-events-span">Manage Upcoming Events</span>
        <div id="tomc-manage-upcoming-events-section">
    
        </div>
        <span class="blue-span" id="manage-past-events-span">Manage Past Events</span>
        <div id="tomc-manage-past-events-section">
    
        </div>
        <span class="purple-span" id="tomc-add-event-span">Add New Event</span>
        <div id="tomc-new-event-section">
            <p class="centered-text hidden" id="tomc-submit-event-success">Thank you, your event has been submitted to admin for approval.</p>
            <p class="centered-text red-text hidden" id="tomc-submit-event-failure">Something went wrong. Please try again.</p>
            <input type="text" aria-label='event title' placeholder="Event Title"></input>
            <textarea aria-label="event description" placeholder="Describe your event and the people behind it."></textarea>
            <label class="centered-text" for="tomc-event-members-or-open">Is this event members-only, or is it open to anyone?</label>
            <input type="radio" name="tomc-event-members-or-open" value="members">members-only</input>
            <input type="radio" name="tomc-event-members-or-open" value="open">open to anyone</input>
            <label class="centered-text" for="tomc-event-limited-or-unlimited">Does this event have a limit on the number of participants who can attent?</label>
            <input type="radio" name="tomc-event-limited-or-unlimited" value="yes">yes, space is limited</input>
            <input type="radio" name="tomc-event-limited-or-unlimited" value="no">no, there is no limit</input>
            <label class="centered-text" for="tomc-event-limit">What is the limit?</label>
            <input type="number" name="tomc-event-limit"></input>
            <p class="centered-text">Note: please make sure the product listing for your ticket also reflects this limit.</p>
            <label class="centered-text" for="tomc-event-free-or-paid">Is this event free, or does it require a ticket?</label>
            <input type="radio" name="tomc-event-free-or-paid" value="free">free</input>
            <input type="radio" name="tomc-event-free-or-paid" value="ticket">requires a ticket</input>
            <select id="tomc-event-ticket-product">
                
            </select>
            <button class="purple-button">submit for review</button>
        </div>
    <?php }) else {
        ?><div class="generic-content half-screen">
            <h1 class="centered-text">To view your events, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</h1>
        </div>
    }
    
</main>

<?php get_footer();
?>
