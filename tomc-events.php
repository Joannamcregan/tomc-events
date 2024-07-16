<?php
/* 
    Plugin Name: TOMC Events
    Version: 1.0
    Author: Joanna
    Description: Manage events for our cooperative
*/

if( ! defined('ABSPATH') ) exit;
require_once plugin_dir_path(__FILE__) . 'inc/tomc-events-route.php';

class TOMCEventsPlugin {
    function __construct() {
        global $wpdb;
        $this->charset = $wpdb->get_charset_collate();
        $this->posts_table = $wpdb->prefix . "posts";
        $this->users_table = $wpdb->prefix . "users";
        $this->event_tickets_table = $wpdb->prefix . "tomc_event_tickets";
        $this->event_signups_table = $wpdb->prefix . "tomc_event_signups";

        add_action('activate_tomc-events/tomc-events.php', array($this, 'onActivate'));
        // add_action('init', array($this, 'onActivate'));
        add_action('init', array($this, 'registerScripts'));
        add_action('wp_enqueue_scripts', array($this, 'pluginFiles'));
        add_filter('template_include', array($this, 'loadTemplate'), 99);
        add_action('init', array($this, 'event_custom_post_types'));
        add_action('add_meta_boxes', array($this, 'addEventMetaBoxes'));
    }

    function event_custom_post_types() {
        register_post_type('event', array(
            'supports' => array('title', 'editor', 'excerpt'),
            'has_archive' => true,
            'rewrite' => array(
                'slug' => 'events'
            ),
            'public' => true,
            'menu_position' => 0,
            'labels' => array(
                'name' => 'Events',
                'add_new' => 'Add New Event',
                'edit_item' => 'Edit Event',
                'all_items' => 'All Events',
                'singular_item' => 'Event'
            ),
            'menu_icon' => 'dashicons-calendar'
        ));
    }

    function addEventMetaBoxes(){
        add_meta_box('event_time', 'Event Time', array($this, 'displayEventTime'), 'event', 'normal', 'high');
        add_meta_box('event_platform', 'Event Platform', array($this, 'displayEventPlatform'), 'event', 'normal', 'high');
        add_meta_box('event_is_members_only', 'Is the event members only?', array($this, 'displayEventMembersOnly'), 'event', 'normal', 'high');
        add_meta_box('event_requires_ticket', 'Does the event require a ticket?', array($this, 'displayEventRequiresTicket'), 'event', 'normal', 'high');
        add_meta_box('event_has_limit', 'Does the event have a limit on the number of people that can attend?', array($this, 'displayEventHasLimit'), 'event', 'normal', 'high');
    }

    function displayEventTime(){
        global $post;
        echo get_post_meta($post->ID, '_tomc_event_time_string', true) ? get_post_meta($post->ID, '_tomc_event_time_string', true) : 'No time has been entered for this event.';
    }

    function displayEventPlatform(){
        global $post;
        echo get_post_meta($post->ID, '_tomc_event_platform', true) ? get_post_meta($post->ID, '_tomc_event_platform', true) : 'The event organizer has not indicated where they plan to host this event.';
    }

    function displayEventMembersOnly(){
        global $post;
        if (get_post_meta($post->ID, '_tomc_event_is_members_only', true)){
            if (get_post_meta($post->ID, '_tomc_event_is_members_only', true) == 1){
                echo 'yes';
            } else if (get_post_meta($post->ID, '_tomc_event_is_members_only', true) == 0){
                echo 'no';
            }
            else {
                echo 'The event organizer has not indicated whether this event is members only or open to everyone.';
            }
        } else {
            echo 'The event organizer has not indicated whether this event is members only or open to everyone.';
        }
    }

    function displayEventRequiresTicket(){
        global $post;
        global $wpdb;
        $event_tickets_table = $wpdb->prefix . "tomc_event_tickets";
        if (get_post_meta($post->ID, '_tomc_event_requires_ticket', true)){
            if (get_post_meta($post->ID, '_tomc_event_requires_ticket', true) == 1){
                echo 'yes';
                $query = 'select productid from %i where eventid = %d order by createddate desc limit 1;';
                $results = $wpdb->get_results($wpdb->prepare($query, $event_tickets_table, $post->ID), ARRAY_A);
                if ($results){
                    echo ' and the product is ' . get_the_title($results[0]['productid']);
                } else {
                    echo 'The event organizer has not indicated which product listing they will be using to sell tickets.';
                }
            } else if (get_post_meta($post->ID, '_tomc_event_requires_ticket', true) == 0){
                echo 'no';
            }
            else {
                echo 'The event organizer has not indicated whether this event is free or requires a ticket.';
            }
        } else {
            echo 'The event organizer has not indicated whether this event is free or requires a ticket.';
        }
    }

    function displayEventHasLimit(){
        global $post;
        echo get_post_meta($post->ID, '_tomc_event_limit', true) ? 'Yes, the limit is ' . get_post_meta($post->ID, '_tomc_event_limit', true) . '.' : 'No limit has been given.';
    }

    function registerScripts(){
        wp_register_style('tomc_events_styles', plugins_url('css/tomc-events-styles.css', __FILE__), false, '1.0', 'all');
    }

    function pluginFiles(){
        wp_enqueue_style('tomc_events_styles');
        wp_enqueue_script('tomc-events-js', plugin_dir_url(__FILE__) . '/build/index.js', array('jquery'), '1.0', true);
        wp_localize_script('tomc-events-js', 'tomcBookorgData', array(
            'root_url' => get_site_url()
        ));
    }

    function addEventsPage() {
        $events_page = array(
            'post_title' => 'Events',
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 0,
            'post_type' => 'page'
        );
        wp_insert_post($events_page);
    }

    function addMyEventsPage() {
        $myevents_page = array(
            'post_title' => 'My Events',
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 0,
            'post_type' => 'page'
        );
        wp_insert_post($myevents_page);
    }

    function onActivate() {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        if (post_exists('Events', '', '', 'page', 'publish') == 0){
            $this->addEventsPage();
        }

        if (post_exists('My Events', '', '', 'page', 'publish') == 0){
            $this->addMyEventsPage();
        }

        dbDelta("CREATE TABLE IF NOT EXISTS $this->event_tickets_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            eventid bigint(20) unsigned NOT NULL,
            productid bigint(20) unsigned NOT NULL,
            createddate datetime NOT NULL,
            createdby bigint(20) unsigned NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (eventid) REFERENCES $this->posts_table(id),
            FOREIGN KEY  (productid) REFERENCES $this->posts_table(id),
            FOREIGN KEY  (createdby) REFERENCES $this->users_table(id)
        ) $this->charset;");

        dbDelta("CREATE TABLE IF NOT EXISTS $this->event_signups_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            eventid bigint(20) unsigned NOT NULL,
            participantid bigint(20) unsigned NOT NULL,
            signupdate datetime NULL,
            orderid bigint(20) unsigned NULL,
            didattend smallint(1) NULL,
            recordedby bigint(20) unsigned NULL,
            recordeddate datetime NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (participantid) REFERENCES $this->users_table(id),
            FOREIGN KEY  (recordedby) REFERENCES $this->users_table(id),
            FOREIGN KEY  (eventid) REFERENCES $this->posts_table(id),
            FOREIGN KEY  (orderid) REFERENCES $this->posts_table(id)
        ) $this->charset;");

        //take care of event date dateAndTime, locationLink, and isMembersOnly with metadata
    }

    function loadTemplate($template){
        if (is_page('my-events')){
            return plugin_dir_path(__FILE__) . 'inc/template-my-events.php';
        } elseif (is_page('events')){
            return plugin_dir_path(__FILE__) . 'inc/template-events.php';
        } elseif (is_archive('event')){
            return plugin_dir_path(__FILE__) . 'inc/template-events.php';
        } elseif (is_singular('event')){
            return plugin_dir_path(__FILE__) . 'inc/single-event.php';
        } else
        return $template;
    }
}

$tomcBookOrganization = new TOMCEventsPlugin();