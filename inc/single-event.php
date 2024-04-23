<?php get_header();

while(have_posts()){
    the_post(); 
    ?>
    <h1 class="centered-text"><?php echo get_the_title(); ?></h1>
    <h2 class="centered-text"><?php echo get_field('event_date'); ?> EST</h2>
    <a href="<?php echo get_field('event_link'); ?>"><p class="centered-text">Register</p></a>
    <div class="generic-content third-screen">
        <div class="alt-accent-wrapper-1">
            <div class="alt-accent-wrapper-0">
                <?php the_content(); ?>
            </div>
        </div>
    </div>
    <?php if (get_field('event_host')){
        $hosts = get_field('event_host');
        ?><h3 class="centered-text">Presented by:</h3>';
        <?php for ($i = 0; $i < count($hosts); $i++){
            ?><div class="generic-content">
                <div class="tomc-event-presenter-pic"><?php echo $hosts[$i]["user_avatar"]; ?></div>
                <h4 class="centered-text"><?php echo $hosts[$i]["display_name"]; ?></h4>
                <p class="tomc-event-presenter-bio"><?php echo $hosts[$i]["user_description"]; ?></p>
            </div>
        <?php }
    }
}
?><p class="right-text"><a href="<?php echo get_post_type_archive_link('event'); ?>">See All Events</a></p>

<?php get_footer(); ?>