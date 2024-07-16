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
    register_rest_route('tomcEvents/v1', 'submitNewEvent', array(
        'methods' => 'POST',
        'callback' => 'submitNewEvent'
    ));
    register_rest_route('tomcEvents/v1', 'getUpcomingEventsByOrganizer', array(
        'methods' => 'GET',
        'callback' => 'getUpcomingEventsByOrganizer'
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

function getUpcomingEventsByOrganizer(){
    global $wpdb;
    $user = wp_get_current_user();
    $userId = get_current_user_id();
    if (is_user_logged_in()){
        $posts_table = $wpdb->prefix . "posts";
        $postmeta_table = $wpdb->prefix . "postmeta";
        $query = 'select posts.id as post_url, posts.post_title, timestring.meta_value as time_string, posts.post_status
        from %i posts
        join %i eventdate on posts.id = eventdate.post_id
        and eventdate.meta_key = "_tomc_event_date"
        join %i timestring on posts.id = timestring.post_id
        and timestring.meta_key = "_tomc_event_time_string"
        where posts.post_type = "event"
        and eventdate.meta_value >= now()
        and posts.post_author = %d';
        $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $postmeta_table, $postmeta_table, $postmeta_table, $userId), ARRAY_A);
        for($i = 0; $i < count($results); $i++){
            $results[$i]['post_url'] = get_permalink($results[$i]['post_url']);
        }
        return $results;
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function getUpcomingRegisteredEvents(){
    $user = wp_get_current_user();
    if (is_user_logged_in()){
        global $wpdb;
        $userId = get_current_user_id();
        $posts_table = $wpdb->prefix . "posts";
        $postmeta_table = $wpdb->prefix . "postmeta";
        $event_signups_table = $wpdb->prefix . "tomc_event_signups";
        $event_tickets_table = $wpdb->prefix . "tomc_event_tickets";
        $lookup_table = $wpdb->prefix . "wc_order_product_lookup";
        $order_items_table = $wpdb->prefix . "woocommerce_order_items";
        $query = 'select posts.id as post_url, posts.post_title, posts.post_content, timestring.meta_value as time_string
        from %i posts
        join %i eventdate on posts.id = eventdate.post_id
        and eventdate.meta_key = "_tomc_event_date"
        join %i timestring on posts.id = timestring.post_id
        and timestring.meta_key = "_tomc_event_time_string"
        join %i signups on posts.id = signups.eventid
        and signups.participantid = %d
        where posts.post_type = "event"
        and eventdate.meta_value >= now()
        union
        select posts.id as post_url, posts.post_title, posts.post_content, timestring.meta_value as time_string
        from %i posts
        join %i eventdate on posts.id = eventdate.post_id
        and eventdate.meta_key = "_tomc_event_date"
        join %i timestring on posts.id = timestring.post_id
        and timestring.meta_key = "_tomc_event_time_string"
        join %i eventtickets on eventtickets.eventId = posts.id
        join %i lookup on eventtickets.productId = lookup.product_id
        join %i orderitems on lookup.order_id = orderitems.order_id
        join %i orders on orderitems.order_id = orders.id
        and orders.post_author = %d
        where posts.post_type = "event"
        and eventdate.meta_value >= now()';
        $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $postmeta_table, $postmeta_table, $event_signups_table, $userId, $posts_table, $postmeta_table, $postmeta_table, $event_tickets_table, $lookup_table, $order_items_table, $posts_table, $userId), ARRAY_A);
        for($i = 0; $i < count($results); $i++){
            $results[$i]['post_url'] = get_permalink($results[$i]['post_url']);
        }
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

function submitNewEvent($data){
    $title = sanitize_text_field($data['title']);
    $product = sanitize_text_field($data['product']);
    $date = sanitize_text_field($data['date']);
    $time = sanitize_text_field($data['time']);
    $timezone = sanitize_text_field($data['timezone']);
    $description = sanitize_text_field($data['description']);
    $isMembersOnly = sanitize_text_field($data['isMembersOnly']);
    $isLimited = sanitize_text_field($data['isLimited']);
    $limit = sanitize_text_field($data['limit']);
    $requiresTicket = sanitize_text_field($data['requiresTicket']);
    $isOnBridge = sanitize_text_field($data['isOnBridge']);
    if (is_user_logged_in()){
        global $wpdb;
        $posts_table = $wpdb->prefix . "posts";
        $userId = get_current_user_id();
        $newEvent = [];
        $newEvent['post_title'] = $title;
        $newEvent['post_content'] = $description;
        $newEvent['post_author'] = $userId;
        $newEvent['post_status'] = 'draft';
        $newEvent['post_date'] = date('Y-m-d H:i:s');
        $newEvent['post_type'] = 'event';
        $wpdb->insert($posts_table, $newEvent);
        $newEventId = $wpdb->insert_id;
        if ($newEventId > 0){
            $postmeta_table = $wpdb->prefix . "postmeta";
            $event_tickets_table = $wpdb->prefix . "tomc_event_tickets";

            $dateMeta = [];
            $dateMeta['post_id'] = $newEventId;
            $dateMeta['meta_key'] = '_tomc_event_date';
            $dateMeta['meta_value'] = $date;
            $wpdb->insert($postmeta_table, $dateMeta);

            $timeMeta = [];
            $timeMeta['post_id'] = $newEventId;
            $timeMeta['meta_key'] = '_tomc_event_time_string';
            $timeMeta['meta_value'] = date('m', strtotime($date)) . '/' . date('d', strtotime($date)) . '/' . date('y', strtotime($date)) . ' at ' . $time . ' ' . $timezone;
            $wpdb->insert($postmeta_table, $timeMeta);

            $platformMeta = [];
            $platformMeta['post_id'] = $newEventId;
            $platformMeta['meta_key'] = '_tomc_event_platform';
            $platformMeta['meta_value'] = $isOnBridge;
            $wpdb->insert($postmeta_table, $platformMeta);

            $membersOnlyMeta = [];
            $membersOnlyMeta['post_id'] = $newEventId;
            $membersOnlyMeta['meta_key'] = '_tomc_event_is_members_only';
            $membersOnlyMeta['meta_value'] = $isMembersOnly;
            $wpdb->insert($postmeta_table, $membersOnlyMeta);

            $ticketMeta = [];
            $ticketMeta['post_id'] = $newEventId;
            $ticketMeta['meta_key'] = '_tomc_event_requires_ticket';
            $ticketMeta['meta_value'] = $requiresTicket;
            $wpdb->insert($postmeta_table, $ticketMeta);

            if ($requiresTicket > 0){
                $eventTicket = [];
                $eventTicket['eventid'] = $newEventId;
                $eventTicket['productid'] = $product;
                $eventTicket['createddate'] = date('Y-m-d H:i:s');
                $eventTicket['createdby'] = $userId;
                $wpdb->insert($event_tickets_table, $eventTicket);
            }

            if ($isLimited > 0){
                $limitMeta = [];
                $limitMeta['post_id'] = $newEventId;
                $limitMeta['meta_key'] = '_tomc_event_limit';
                $limitMeta['meta_value'] = $limit;
                $wpdb->insert($postmeta_table, $limitMeta);
            }

        }
        return $newEventId;
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}