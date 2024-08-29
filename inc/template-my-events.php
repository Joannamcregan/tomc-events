<?php get_header();
global $wpdb;
$posts_table = $wpdb->prefix . "posts";
$term_taxonomy_table = $wpdb->prefix . "term_taxonomy";
$terms_table = $wpdb->prefix . "terms";
$term_relationships_table = $wpdb->prefix . "term_relationships";
?><main>
    <div class="banner"><h1 class="centered-text">My Events</h1></div>
    <br>
    <?php if (is_user_logged_in()){
        $user = wp_get_current_user();
        $userId = $user->ID;
        // $userId = get_current_user_id();
        ?><span class="purple-span" id="upcoming-registered-events-span">Upcoming Registered Events</span>
        <div id="tomc-registered-events-section" class="hidden">
            <div id="no-registered-events-error" class="hidden">
                <p class="centered-text">You currently have no registered events.</p>
                <p class="centered-text">
                    <a href="<?php echo esc_url(site_url('/events')); ?>">View all events.</a>
                </p>
            </div>
        </div>
        <span class="orange-span" id="manage-upcoming-events-span">Manage Upcoming Events</span>
        <div id="tomc-manage-upcoming-events-section" class="hidden">
    
        </div>
        <span class="blue-span" id="manage-past-events-span">Manage Past Events</span>
        <div id="tomc-manage-past-events-section" class="hidden">
    
        </div>
        <span class="purple-span" id="tomc-add-event-span" class="hidden">Add New Event</span>
        <div id="tomc-new-event-section" class="hidden">
            <p class="centered-text"><em>All events must be approved by admin before they will be shown to the community.</em></p>
            <label for="tomc-event-free-or-paid" class="centered-text block">Is this event free, or does it require a ticket?</label>
            <div class="tomc-new-event-option-group">
                <span class="tomc-events--option-span tomc-events--option-selected" aria-label="this option is selected" id="tomc-event-free-option">free</span>
                <span class="tomc-events--option-span" aria-label="this option is not selected" id="tomc-event-ticket-option">requires a ticket</span>
            </div>
            <?php $query = 'select products.post_title, products.id
            from %i products
            join %i tr on products.id = tr.object_id
            and products.post_type = "product"
            and products.post_status = "publish"
            and products.post_author = %d
            join %i tt on tr.term_taxonomy_id = tt.term_taxonomy_id
            and tt.taxonomy = "product_cat"
            join %i terms on tt.term_id = terms.term_id
            and terms.name = "Event Tickets";';
            $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $term_relationships_table, $userId, $term_taxonomy_table, $terms_table), ARRAY_A);
            ?><div id="tomc-new-event-ticket-section" class="hidden">
            <?php if (($results) && (count($results) > 0)){
                ?><p class="centered-text">Select the ticket listing that goes with this event.</p>
                    <select id="tomc-event-ticket-product">
                        <option value=0></option>
                        <?php for($i = 0; $i < count($results); $i++){
                            ?><option value=<?php echo $results[$i]['id']; ?>><?php echo $results[$i]['post_title']; ?></option>
                        <?php }
                    ?></select>
            <?php } else {
                if (!(in_array( 'dc_vendor', (array) $user->roles ))){
                    $user->add_role( 'dc_vendor' );
                }
                ?><p class="centered-text red-text">Before you can submit an event that costs money, you must add an event ticket through your <a href="<?php echo esc_url(site_url('/my-account')); ?>">dashboard</a>.</p>
            <?php }
            ?></div>
            <label for="tomc-new-event-title" class="centered-text block">What is your event called</label>
            <input type="text" id="tomc-new-event-title" class="block"></input>
            <label for="tomc-new-event-date" class="centered-text block">When is your event?</label>
            <input type="date" id="tomc-new-event-date" class="block"></input>
            <label for="tomc-new-event-time" class="centered-text block">What time is your event?</label>
            <input type="time" id="tomc-new-event-time" class="block"></input>
            <div class="tomc-new-event-option-group">
                <span class="tomc-event-time-zone-option tomc-events--option-span" aria-label="this option is not selected">Eastern Time</span>
                <span class="tomc-event-time-zone-option tomc-events--option-span" aria-label="this option is not selected">Central Time</span>
                <span class="tomc-event-time-zone-option tomc-events--option-span" aria-label="this option is not selected">Mountain Time</span>
                <span class="tomc-event-time-zone-option tomc-events--option-span" aria-label="this option is not selected">Pacific Time</span>
                <span class="tomc-event-time-zone-option tomc-events--option-span" aria-label="this option is not selected">Alaska Time</span>
                <span class="tomc-event-time-zone-option tomc-events--option-span tomc-events--option-selected" aria-label="this option is selected" id="tomc-new-event-hawaii">Hawaii Time</span>
            </div>
            <p class="centered-text">Where will your event be hosted?</p>
            <div class="tomc-new-event-option-group">
                <span class="tomc-events--option-span tomc-events--option-selected" aria-label="this option is selected" id="tomc-event-bridge-option">TOMC's virtual room on CommunityBridge</span>
                <span class="tomc-events--option-span" aria-label="this option is not selected" id="tomc-event-outside-option">another platform</span>
            </div>
            <p class="centered-text"><em><a href="https://communitybridge.com" target="_blank">CommunityBridge</a> is co-op that utilizes BigBlueButton technology to power virtual meeting rooms.</em></p>
            <label for="tomc-new-event-description" class="centered-text block">Describe your event and the people behind it.</label>
            <textarea id="tomc-new-event-description" class="block"></textarea>
            <label for="tomc-event-members-or-open" class="centered-text block">Is this event members-only, or is it open to anyone?</label>
            <div class="tomc-new-event-option-group">
                <span class="tomc-events--option-span" aria-label="this option is selected" id="tomc-new-event-members-only-option">members-only</span>
                <span class="tomc-events--option-span tomc-events--option-selected" aria-label="this option is not selected" id="tomc-new-event-open-option">open to anyone</span>
            </div>
            <label for="tomc-event-limited-or-unlimited" class="centered-text block">Does this event have a limit on the number of participants who can attent?</label>
            <div class="tomc-new-event-option-group">
                <span class="tomc-events--option-span" aria-label="this option is not selected" id="tomc-new-event-limited-option">yes, space is limited</span>
                <span class="tomc-events--option-span tomc-events--option-selected" aria-label="this option is selected" id="tomc-new-event-unlimited-option">no, there is no limit</span>
            </div>
            <div id="tomc-new-event-limit-section" class="hidden">
                <label for="tomc-event-limit" class="centered-text block">What is the limit?</label>
                <input type="number" name="tomc-event-limit" class="block" id="tomc-event-limit"></input>
                <p id="tomc-event-limit-ticket-reminder" class="centered-text hidden">Note: please make sure the product listing for your ticket also reflects this limit.</p>
            </div>            
            <p class="centered-text hidden" id="tomc-submit-event-success">Thank you, your event has been submitted to admin for approval.</p>
            <p class="centered-text red-text hidden" id="tomc-submit-event-failure">Something went wrong. Please try again.</p>
            <p class="centered-text red-text hidden" id="tomc-events-no-product-error">You must select the product listing for your event's tickets.</p>
            <p class="centered-text red-text hidden" id="tomc-events-no-title-error">You must enter your event's title.</p>
            <p class="centered-text red-text hidden" id="tomc-events-no-date-error">You must enter your event's date.</p>
            <p class="centered-text red-text hidden" id="tomc-events-no-time-error">You must enter your event's time.</p>
            <p class="centered-text red-text hidden" id="tomc-events-no-description-error">You must enter your event's description.</p>
            <p class="centered-text red-text hidden" id="tomc-events-no-limit-error">You must enter your event's attendance limit.</p>
            <button class="purple-button" id="tomc-new-event-submit">submit for review</button>
        </div>
    <?php } else {
        ?><div class="generic-content half-screen">
            <h1 class="centered-text">To view your events, you must first <a href="<?php echo esc_url(site_url('/my-account')); ?>">login</a>.</h1>
        </div>
    <?php }
    
?></main>
<div class="hidden search-overlay" id="tomc-events-attendance-overlay">
    <h1 class="centered-text">Attendance</h1>
</div>

<?php get_footer();
?>
