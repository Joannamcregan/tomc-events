<?php wp_reset_postdata();
get_header();
// title (post_title)

// date and time (post meta)

// whether members only

// description (post_content)

// event link (post meta)

// posted by (link to user page)
$postId = get_the_ID();
global $wpdb;
$posts_table = $wpdb->prefix . "posts";
$postmeta_table = $wpdb->prefix . "postmeta";
$users_table = $wpdb->prefix . "users";
$usermeta_table = $wpdb->prefix . "usermeta";
$event_signups_table = $wpdb->prefix . "tomc_event_signups";
$query = 'select posts.post_title, 
posts.post_content, 
timestring.meta_value as time_string, 
membersonly.meta_value as members_only, 
users.user_nicename, 
usermeta.meta_value as user_description,
seatlimit.meta_value as seat_limit,
count(signups.id) as signups
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
where posts.id = %d
group by posts.id';
$results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $users_table, $usermeta_table, $postmeta_table, $postmeta_table, $postmeta_table, $event_signups_table, $postId), ARRAY_A);
?><main>
    <div class="banner"><h1 class="centered-text"><?php echo $results[0]['post_title']; ?></h1></div>
    <br>
    <p class="centered-text"><strong><?php echo $results[0]['time_string']; ?></strong></p>
    <div class="generic-content">
        <?php echo $results[0]['post_content']; 
        if ($results[0]['members_only'] == 1){
            ?><p class="right-text"><em>This event is only for Trunk of My Car member-owners.</em></p>
            <?php if (is_user_logged_in()){
                $userId = get_current_user_id();
                $userQuery = 'select *
                from %i
                where participantid = %d
                and eventid = %d';
                $userResults = $wpdb->get_results($wpdb->prepare($query, $event_signups_table, $userId, $postId), ARRAY_A);
                if (count($userId) > 0){
                    ?><p class="centered-text"><strong>You are already registered for this event</strong></p>
                <?php } else {
                    if ($results[0]['seat_limit'] != 'null' && $results[0]['seat_limit'] != ''){
                        if ($results[0]['seat_limit'] > $results[0]['signups']){
                            echo 'yay, there is still room!';
                        } else {
                            ?><p class="centered-text"><strong>Sorry, this event is full.</strong></p>
                        <?php }
                    }
                    //also join event_products to main query and add condition check for if the event requires a ticket and the logged in user already purchased one
                }
            } else {
                ?><p class="centered-text"><strong>To register for an event, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</strong></p>
            <?php }
        }
    ?></div>
    <div class="generic-wrapper-2">
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