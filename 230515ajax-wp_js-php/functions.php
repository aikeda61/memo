<!--「もっと見る」button処理 -->

<?php
function my_more_thoughts(){
	$args = array(
		'post_type' => 'thoughts',
		'posts_per_page' => -1,
	);
	$my_posts = get_posts($args);
	$item = [];
	foreach ($my_posts as $key => $val):
		global $post;
		$post = $val;
		setup_postdata($post);
		$item[$key]['title'] = get_the_title();
		$item[$key]['image'] = get_field('img');
		$item[$key]['text'] = get_field('text');
		$item[$key]['course'] = get_field('course');
	endforeach; wp_reset_postdata();
	echo json_encode($item);
	die();
}
add_action('wp_ajax_thoughts', 'my_more_thoughts');   
add_action('wp_ajax_nopriv_thoughts', 'my_more_thoughts');
	
?>