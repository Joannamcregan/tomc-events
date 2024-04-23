<?php global $wpdb;
$posts_table = $wpdb->prefix . "posts";
$users_table = $wpdb->prefix . "users";
$userid = get_current_user_id();
$user = wp_get_current_user();

get_header();

?><main class="half-screen">    
    <?php if (is_user_logged_in()){
        // if (in_array( 'member', (array) $user->roles ) ){    
            $userQuery = 'select id, display_name, user_email from %i order by display_name';
            $users = $wpdb->get_results($wpdb->prepare($userQuery, $users_table, $userid));
            ?><div class="banner"><h1 class="centered-text">Manage Your Events</h1></div>
            <p class="centered-text">Events must be approved by site admin before they will be publicly displayed.</p>
            <div class="page-accent-alt-thin">
                <h2 class="centered-text">Submit a new event</h2>
                <input type="text" class="tomc-book-organization-text-input centered-text" id="tomc-book-organization-new-event" placeholder="Event name"></input>
                <textarea class="tomc-book-organization-textarea--edit" id="tomc-book-organization--new-event-details" placeholder="Event details"></textarea>
                <p id="tomc-blank-event-name-message" class="hidden centered-text tomc-book-organization--red-text">Name cannot be blank.</p>
                <p id="tomc-blank-event-bio-message" class="hidden centered-text tomc-book-organization--red-text">Bio cannot be blank.</p>
                <h3 class="centered-text">Presenter(s)</h3>
                <div class="flex justify-content-center">
                    <select id="tomc-event-presenter-select">
                    <?php foreach($users as $user){
                        ?><option data-user-id="<?php echo $user->id; ?>"><?php echo $user->display_name . ' (' . $user->user_email . ')'; ?></option>
                    <?php }
                    ?></select>
                    <button id="tomc-event-attendance-add-presenter">add user</button>
                </div>
                <div class="tomc-event-attendance-users"></div>
                <div class="flex justify-content-center">
                    <button id="tomc--save-new-event">submit event</button>
                    <button id="tomc--cancel-new-event">cancel</button>
                </div>
            </div>
            <?php $query = 'select p.id, p.post_title, p.post_content from %i p where p.post_type = "event" and p.post_author = %d';
            $events = $wpdb->get_results($wpdb->prepare($query, $posts_table, $userid));
            if ($events){
                ?><div class="third-screen">
                    <?php foreach($events as $event){
                        ?><div class="page-accent-alt-thin" data-event-id="<?php echo $event->id; ?>">
                            <h2 class="centered-text"><?php echo $event->post_title; ?></h2>
                            <p class="generic-content"><?php echo $event->post_content; ?></p>
                            <button class="tomc--manage-event">record attendance</button>
                        </div>
                    <?php }
                ?></div>                    
            <?php } 
        // } else {
        //     echo '<div>';
        //         echo '<p class="centered-text">Only members can submit and manage events.</p>';
        //     echo '</div>';
        // }
    } else {
        ?><div class="half-screen">
            <p class="centered-text">Only logged-in members can submit and manage events. <a href="<?php echo esc_url(site_url('/my-account'));?>">Login</a></p>
        </div>
    <?php }
    ?><div class="tomc-event-attendance-section">
        <h3 class="centered-text">Event participants</h3>
        <p class="centered-text">Add all community members who attended the event.</p>
        <div class="flex justify-content-center">
            <select id="tomc-event-attendance-select">
            <?php foreach($users as $user){
                ?><option data-user-id="<?php echo $user->id; ?>"><?php echo $user->display_name . ' (' . $user->user_email . ')'; ?></option>
            <?php }
            ?></select>
            <button id="tomc-event-attendance-add-user">add user</button>
        </div>
        <div class="tomc-event-attendance-users"></div>
    </div>
</main>

<?php get_footer(); ?>