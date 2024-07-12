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
        $userId = get_current_user_id();
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
        <div id="tomc-new-event-section" class="hidden">
            <p class="centered-text hidden" id="tomc-submit-event-success">Thank you, your event has been submitted to admin for approval.</p>
            <p class="centered-text red-text hidden" id="tomc-submit-event-failure">Something went wrong. Please try again.</p>
            <label for="tomc-new-event-title" class="centered-text block">What is your event called</label>
            <input type="text" id="tomc-new-event-title" class="block"></input>
            <label for="tomc-new-event-date" class="centered-text block">When is your event?</label>
            <input type="date" id="tomc-new-event-date" class="block"></input>
            <label for="tomc-new-event-time" class="centered-text block">What time is your event?</label>
            <input type="time" id="tomc-new-event-time" class="block"></input>
            <label for="tomc-new-event-description" class="centered-text block">Describe your event and the people behind it.</label>
            <textarea id="tomc-new-event-description" class="block"></textarea>
            <label for="tomc-event-members-or-open" class="centered-text block">Is this event members-only, or is it open to anyone?</label>
            <div class="tomc-event-form-radio-options">
                <input type="radio" name="tomc-event-members-or-open" value="members">members-only</input><br>
                <input type="radio" name="tomc-event-members-or-open" value="open">open to anyone</input>
            </div>
            <label for="tomc-event-limited-or-unlimited" class="centered-text block">Does this event have a limit on the number of participants who can attent?</label>
            <div class="tomc-event-form-radio-options">
                <input type="radio" name="tomc-event-limited-or-unlimited" value="yes">yes, space is limited</input><br>
                <input type="radio" name="tomc-event-limited-or-unlimited" value="no">no, there is no limit</input>
            </div>
            <label for="tomc-event-limit" class="centered-text block">What is the limit?</label>
            <input type="number" name="tomc-event-limit" class="block"></input>
            <p class="centered-text">Note: please make sure the product listing for your ticket also reflects this limit.</p>
            <label for="tomc-event-free-or-paid" class="centered-text block">Is this event free, or does it require a ticket?</label>
            <div class="tomc-event-form-radio-options">
                <input type="radio" name="tomc-event-free-or-paid" value="free">free</input><br>
                <input type="radio" name="tomc-event-free-or-paid" value="ticket">requires a ticket</input>
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
            for($i = 0; $i < count($results); $i++){
                ?><option value="<?php echo $results[$i]['id']; ?>"><?php echo $results[$i]['post_title']; ?></option>
            <?php }
            echo $wpdb->prepare($query, $posts_table, $term_relationships_table, $userId, $term_taxonomy_table, $terms_table);
            ?><select id="tomc-event-ticket-product"></select>
            <button class="purple-button">submit for review</button>
        </div>
    <?php } else {
        ?><div class="generic-content half-screen">
            <h1 class="centered-text">To view your events, you must first <a href="<?php echo esc_url(site_url('/my-account')); ?>">login</a>.</h1>
        </div>
    <?php }
    
?></main>

<?php get_footer();
?>
