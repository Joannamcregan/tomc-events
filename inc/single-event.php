<?php wp_reset_postdata();
get_header();
$postId = get_the_ID();
global $wpdb;
$posts_table = $wpdb->prefix . "posts";
$postmeta_table = $wpdb->prefix . "postmeta";
$users_table = $wpdb->prefix . "users";
$usermeta_table = $wpdb->prefix . "usermeta";
$event_signups_table = $wpdb->prefix . "tomc_event_signups";
$event_tickets_table = $wpdb->prefix . "tomc_event_tickets";
$lookup_table = $wpdb->prefix . "wc_order_product_lookup";
$order_items_table = $wpdb->prefix . "woocommerce_order_items";
$event_tickets_table = $wpdb->prefix . "tomc_event_tickets";
$query = 'select posts.post_title, 
posts.post_content, 
timestring.meta_value as time_string, 
membersonly.meta_value as members_only, 
users.user_nicename, 
usermeta.meta_value as user_description,
seatlimit.meta_value as seat_limit,
count(signups.id) as signups,
eventtickets.productid as ticket_product,
eventdate.meta_value as eventdate
from %i posts
join %i users on posts.post_author = users.id
left join %i usermeta on users.id = usermeta.user_id
and usermeta.meta_key = "description"
join %i timestring on posts.id = timestring.post_id
and timestring.meta_key = "_tomc_event_time_string"
join %i membersonly on posts.id = membersonly.post_id
and membersonly.meta_key = "_tomc_event_is_members_only"
left join %i seatlimit on posts.id = seatlimit.post_id
and seatlimit.meta_key = "_tomc_event_limit"
left join %i signups on posts.id = signups.eventid
left join %i eventtickets on posts.id = eventtickets.eventid
left join %i eventdate on posts.id = eventdate.post_id
and eventdate.meta_key = "_tomc_event_date"
where posts.id = %d
group by posts.id';
$results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $users_table, $usermeta_table, $postmeta_table, $postmeta_table, $postmeta_table, $event_signups_table, $event_tickets_table, $postmeta_table, $postId), ARRAY_A);
?><main>
    <div class="banner"><h1 class="centered-text"><?php echo $results[0]['post_title']; ?></h1></div>
    <br>
    <p class="centered-text"><strong><?php echo 'scheduled for ' . $results[0]['time_string']; ?></strong></p>
    <div class="generic-content">
        <?php echo $results[0]['post_content'];
    ?></div>
        <?php if (($results[0]['eventdate'] != 'null') && ($results[0]['eventdate'] >= date('Y-m-d H:i:s'))){
        if ($results[0]['members_only'] == 1){
            ?><p class="right-text"><em>This event is members-only.</em></p>
            <?php if (is_user_logged_in()){
                $userId = get_current_user_id();
                $user = wp_get_current_user();
                if ($results[0]['ticket_product'] != 'null' && $results[0]['ticket_product'] != ''){
                    //checking for purchased ticket
                    $userQuery = 'select posts.id
                    from %i orderitems
                    join %i lookup on orderitems.order_id = lookup.order_id
                    join %i posts on lookup.order_id = posts.id
                    join %i eventtickets on eventtickets.productid = lookup.product_id
                    where eventtickets.eventid = %d
                    and posts.post_author = %d';
                    $userResults = $wpdb->get_results($wpdb->prepare($userQuery, $order_items_table, $lookup_table, $posts_table, $event_tickets_table, $postId, $userId), ARRAY_A);
                    if (($userResults) && count($userResults) > 0){
                        ?><p class="centered-text">You've already ordered a ticket for this event.</p>
                    <?php } else {
                        $productQuery = 'select productid
                        from %i
                        where eventid = %d';
                        $productResults = $wpdb->get_results($wpdb->prepare($productQuery, $event_tickets_table, $postId), ARRAY_A);
                        ?><a class="no-decoration" href="<?php echo get_the_permalink($productResults[0]['productid']); ?>"><span class="blue-span tomc-event-ticket-link">Order a Ticket</span></a>
                    <?php }
                } else {
                    //checking for registration
                    $userQuery = 'select id
                    from %i
                    where participantid = %d
                    and eventid = %d';
                    $userResults = $wpdb->get_results($wpdb->prepare($userQuery, $event_signups_table, $userId, $postId), ARRAY_A);
                    if (($userResults) && count($userResults) > 0){
                        ?><p class="centered-text"><strong>You are already registered for this event</strong></p>
                    <?php } else {
                        if ($results[0]['seat_limit'] != 'null' && $results[0]['seat_limit'] != ''){
                            if ($results[0]['seat_limit'] > $results[0]['signups']){
                                if ($results[0]['members_only'] == 1){
                                    if (in_array( 'reader-member', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) || in_array( 'administrator', (array) $user->roles )){
                                        ?><span class="purple-span tomc-event-register" data-post="<?php echo $postId; ?>">Register Now</span>
                                        <p class="tomc-registration-success centered-text hidden">You're registered!</p>
                                        <p class="tomc-registration-fail centered-text hidden">Sorry, we were not able to register you for this event. Please try again.</p>
                                    <?php } else {
                                        ?><p class="centered-text">Before you can register for this event, you must <a href="<?php echo esc_url(site_url('/own'));?>">join our cooperative</a>.</p>
                                    <?php }
                                } else {
                                    ?><span class="purple-span tomc-event-register" data-post="<?php echo $postId; ?>">Register Now</span>
                                    <p class="tomc-registration-success centered-text hidden">You're registered!</p>
                                    <p class="tomc-registration-fail centered-text hidden">Sorry, we were not able to register you for this event. Please try again.</p>
                                <?php }
                            } else {
                                ?><p class="centered-text"><strong>Sorry, this event is full.</strong></p>
                            <?php }
                        } else {
                            ?><span class="purple-span tomc-event-register" data-post="<?php echo $postId; ?>">Register Now</span>
                            <p class="tomc-registration-success centered-text hidden">You're registered!</p>
                            <p class="tomc-registration-fail centered-text hidden">Sorry, we were not able to register you for this event. Please try again.</p>
                        <?php }
                    }
                }
            } else {
                ?><p class="centered-text"><strong>To register for an event, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</strong></p>
            <?php }
        } else {
            if (is_user_logged_in()){
                $userId = get_current_user_id();
                $user = wp_get_current_user();
                if ($results[0]['ticket_product'] != 'null' && $results[0]['ticket_product'] != ''){
                    //checking for purchased ticket
                    $userQuery = 'select posts.id
                    from %i orderitems
                    join %i lookup on orderitems.order_id = lookup.order_id
                    join %i posts on lookup.order_id = posts.id
                    join %i eventtickets on eventtickets.productid = lookup.product_id
                    where eventtickets.eventid = %d
                    and posts.post_author = %d';
                    $userResults = $wpdb->get_results($wpdb->prepare($userQuery, $order_items_table, $lookup_table, $posts_table, $event_tickets_table, $postId, $userId), ARRAY_A);
                    if (($userResults) && count($userResults) > 0){
                        ?><p class="centered-text">You've already ordered a ticket for this event.</p>
                    <?php } else {
                        $productQuery = 'select productid
                        from %i
                        where eventid = %d';
                        $productResults = $wpdb->get_results($wpdb->prepare($productQuery, $event_tickets_table, $postId), ARRAY_A);
                        ?><a class="no-decoration" href="<?php echo get_the_permalink($productResults[0]['productid']); ?>"><span class="blue-span tomc-event-ticket-link">Order a Ticket</span></a>
                    <?php }
                } else {
                    //checking for registration
                    $userQuery = 'select id
                    from %i
                    where participantid = %d
                    and eventid = %d';
                    $userResults = $wpdb->get_results($wpdb->prepare($userQuery, $event_signups_table, $userId, $postId), ARRAY_A);
                    if (($userResults) && count($userResults) > 0){
                        ?><p class="centered-text"><strong>You are already registered for this event</strong></p>
                    <?php } else {
                        if ($results[0]['seat_limit'] != 'null' && $results[0]['seat_limit'] != ''){
                            if ($results[0]['seat_limit'] > $results[0]['signups']){
                                if ($results[0]['members_only'] == 1){
                                    if (in_array( 'reader-member', (array) $user->roles ) || in_array( 'creator-member', (array) $user->roles ) || in_array( 'administrator', (array) $user->roles )){
                                        ?><span class="purple-span tomc-event-register" data-post="<?php echo $postId; ?>">Register Now</span>
                                        <p class="tomc-registration-success centered-text hidden">You're registered!</p>
                                        <p class="tomc-registration-fail centered-text hidden">Sorry, we were not able to register you for this event. Please try again.</p>
                                    <?php } else {
                                        ?><p class="centered-text">Before you can register for this event, you must <a href="<?php echo esc_url(site_url('/own'));?>">join our cooperative</a>.</p>
                                    <?php }
                                } else {
                                    ?><span class="purple-span tomc-event-register" data-post="<?php echo $postId; ?>">Register Now</span>
                                    <p class="tomc-registration-success centered-text hidden">You're registered!</p>
                                    <p class="tomc-registration-fail centered-text hidden">Sorry, we were not able to register you for this event. Please try again.</p>
                                <?php }
                            } else {
                                ?><p class="centered-text"><strong>Sorry, this event is full.</strong></p>
                            <?php }
                        } else {
                            ?><span class="purple-span tomc-event-register" data-post="<?php echo $postId; ?>">Register Now</span>
                            <p class="tomc-registration-success centered-text hidden">You're registered!</p>
                            <p class="tomc-registration-fail centered-text hidden">Sorry, we were not able to register you for this event. Please try again.</p>
                        <?php }
                    }
                }
            } else {
                ?><p class="centered-text"><strong>To register for an event, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</strong></p>
            <?php }
        }
    }
    ?><div class="generic-wrapper-2">
        <div class="generic-wrapper-1">
            <div class="generic-wrapper-0">
                <h2 class="centered-text">Meet the Organizer</h2>
                <h3 class="centered-text"><?php echo $results[0]['user_nicename']; ?></h3>
                <p>
                    <?php if ($results[0]['user_description'] != 'null' && $results[0]['user_description'] != ''){
                        echo $results[0]['user_description'];
                    } else {
                        echo $results[0]['user_nicename'] . " hasn't entered a bio yet.";
                    }
                ?></p>
            </div>
        </div>
    </div>
</main>

<?php get_footer();
?>