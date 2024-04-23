<?php get_header(); 
$pastEvents = new WP_Query(array(
    'post_type' => 'event',
    'paged' => get_query_var('paged', 1),
    'orderby' => 'meta_value',
    'meta_query' => array(
        array(
          'key' => 'event_date',
        )
        ),
    'meta_type' => 'DATE',
    'order' => 'ASC'
  ));

?><div class="banner">
    <h1 class="centered-text">Events</h1>
</div>
<div class="two-thirds-screen">
    <?php while(have_posts()){
        the_post(); ?>
        <div class="accent-wrapper-1">
            <div class="accent-wrapper-0">                    
                <div class="archive-item">
                    <h2><a class="gray-link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <p><?php echo get_field('event_date'); ?> EST</p>
                    <?php the_excerpt(); ?>
                    <p><a href="<?php the_permalink(); ?>">See more &raquo;</a></p>
                </div>
            </div>
        </div>
    <?php }
?></div>

<?php get_footer(); ?>