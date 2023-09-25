<?php
//  Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'ALLOW_UNFILTERED_UPLOADS' ) ) {
	define( 'ALLOW_UNFILTERED_UPLOADS', true );
}

if ( ! function_exists( 'ai_site_builder_admin_load' ) ) :

	require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	/**
	 * Themehunk Sites Setup
	 *
	 * @since 1.0.5
	 */
	function ai_site_builder_admin_load() {
	require_once(AI_SITE_BUILDER_DIR_PATH . 'core/class-installation.php');
	require_once(AI_SITE_BUILDER_DIR_PATH . 'core/class-admin-load.php');

	}

	add_action( 'init', 'ai_site_builder_admin_load' );

endif;