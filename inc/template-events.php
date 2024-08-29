<?php get_header();
?><main>
    <div class="banner"><h1 class="centered-text">Events</h1></div>
    <br>
    <span id="tomc-upcoming-events-span" class="purple-span">Upcoming Events</span>
    <div id="tomc-upcoming-events-section" class="hidden">

    </div>
    <span id="tomc-past-events-span" class="blue-span">Past Events</span>
    <div id="tomc-past-events-section" class="hidden">
        
    </div>
    <a id="tomc-my-events-link" class="no-decoration" href="<?php echo esc_url(site_url('/my-events'));?>"><span id="tomc-my-events-span" class="orange-span">My Events</span></a>
</main>

<?php get_footer();
?>