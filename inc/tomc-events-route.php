<?php

add_action('rest_api_init', 'tomcEventsRegisterRoute');

function tomcEventsRegisterRoute() {
    register_rest_route('tomcEvents/v1', 'getUpcomingEvents', array(
        'methods' => 'GET',
        'callback' => 'getUpcomingEvents'
    ));
    register_rest_route('tomcEvents/v1', 'getPastEvents', array(
        'methods' => 'GET',
        'callback' => 'getPastEvents'
    ));
    register_rest_route('tomcEvents/v1', 'getUpcomingRegisteredEvents', array(
        'methods' => 'GET',
        'callback' => 'getUpcomingRegisteredEvents'
    ));
    register_rest_route('tomcEvents/v1', 'registerForEvent', array(
        'methods' => 'POST',
        'callback' => 'registerForEvent'
    ));
}

function getUpcomingEvents(){
    global $wpdb;
    $posts_table = $wpdb->prefix . "posts";
    $postmeta_table = $wpdb->prefix . "postmeta";
    $query = 'select posts.id as post_url, posts.post_title, posts.post_content, timestring.meta_value as time_string, membersonly.meta_value as members_only 
    from %i posts
    join %i eventdate on posts.id = eventdate.post_id
    and eventdate.meta_key = "_tomc_event_date"
    join %i timestring on posts.id = timestring.post_id
    and timestring.meta_key = "_tomc_event_time_string"
    join %i membersonly on posts.id = membersonly.post_id
    and membersonly.meta_key = "_tomc_event_is_members_only"
    where posts.post_type = "event"
    and eventdate.meta_value >= now()';
    $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $postmeta_table, $postmeta_table, $postmeta_table), ARRAY_A);
    for($i = 0; $i < count($results); $i++){
        $results[$i]['post_url'] = get_permalink($results[$i]['post_url']);
    }
    return $results;
}

function getPastEvents(){
    global $wpdb;
    $posts_table = $wpdb->prefix . "posts";
    $postmeta_table = $wpdb->prefix . "postmeta";
    $query = 'select posts.id as post_url, posts.post_title, posts.post_content, timestring.meta_value as time_string, membersonly.meta_value as members_only 
    from %i posts
    join %i eventdate on posts.id = eventdate.post_id
    and eventdate.meta_key = "_tomc_event_date"
    join %i timestring on posts.id = timestring.post_id
    and timestring.meta_key = "_tomc_event_time_string"
    join %i membersonly on posts.id = membersonly.post_id
    and membersonly.meta_key = "_tomc_event_is_members_only"
    where posts.post_type = "event"
    and eventdate.meta_value < now()
    order by eventdate.meta_value desc';
    $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $postmeta_table, $postmeta_table, $postmeta_table), ARRAY_A);
    for($i = 0; $i < count($results); $i++){
        $results[$i]['post_url'] = get_permalink($results[$i]['post_url']);
    }
    return $results;
}

function getUpcomingRegisteredEvents(){
    $user = wp_get_current_user();
    if (is_user_logged_in() && (in_array( 'administrator', (array) $user->roles ) )){
        global $wpdb;
        $userId = get_current_user_id();
        $posts_table = $wpdb->prefix . "posts";
        $postmeta_table = $wpdb->prefix . "postmeta";
        $event_signups_table = $wpdb->prefix . "tomc_event_signups";
        $query = 'select posts.id as post_url, posts.post_title, posts.post_content, timestring.meta_value as time_string, membersonly.meta_value as members_only 
        from %i posts
        join %i eventdate on posts.id = eventdate.post_id
        and eventdate.meta_key = "_tomc_event_date"
        join %i timestring on posts.id = timestring.post_id
        and timestring.meta_key = "_tomc_event_time_string"
        join %i membersonly on posts.id = membersonly.post_id
        and membersonly.meta_key = "_tomc_event_is_members_only"
        join %i signups on posts.id = signups.eventid
        and signups.participantid = %d
        where posts.post_type = "event"
        and eventdate.meta_value >= now()';
        $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $postmeta_table, $postmeta_table, $postmeta_table, $event_signups_table, $userId), ARRAY_A);
        return $results;
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function registerForEvent($data){
    $eventId = sanitize_text_field($data['event']);
    if (is_user_logged_in()){
        global $wpdb;
        $event_signups_table = $wpdb->prefix . "tomc_event_signups";
        $userId = get_current_user_id();
        $newSignup = [];
        $newSignup['eventId'] = $eventId;
        $newSignup['participantid'] = $userId;
        $newSignup['signupdate'] = date('Y-m-d H:i:s');
        $wpdb->insert($event_signups_table, $newSignup);
        $newSignupId = $wpdb->insert_id;
        return $newSignupId;
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}