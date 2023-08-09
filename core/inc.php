<?php


if ( ! defined( 'ALLOW_UNFILTERED_UPLOADS' ) ) {
	define( 'ALLOW_UNFILTERED_UPLOADS', true );
}

// if ( ! defined( 'THEMEHUNK_THEME_SETTINGS' ) ) {
// 	define( 'THEMEHUNK_THEME_SETTINGS', __( 'Themehunk Sites', 'themehunk-site-library' ) );
// }

// if ( ! defined( 'THEMEHUNK_SITE_LIBRARY_FILE' ) ) {
// 	define( 'THEMEHUNK_SITE_LIBRARY_FILE', __FILE__ );
// }


// if ( ! defined( 'THEMEHUNK_SITE_LIBRARY_BASE' ) ) {
// 	define( 'THEMEHUNK_SITE_LIBRARY_BASE', plugin_basename( THEMEHUNK_SITE_LIBRARY_FILE ) );
// }

// if ( ! defined( 'AI_SITE_BUILDER_DIR_CORE' ) ) {
// 	define( 'THEMEHUNK_SITE_LIBRARY_DIR', AI_SITE_BUILDER_DIR_PATH.'core/' );
// }
// if ( ! defined( 'AI_SITE_BUILDER_PLUGIN_URL' ) ) {
// 	define( 'AI_SITE_BUILDER_PLUGIN_URL', AI_SITE_BUILDER_PLUGIN_URL.'core/importer/' );
// }

if ( ! function_exists( 'ai_site_builder_admin_load' ) ) :

	require_once( ABSPATH . 'wp-admin/includes/plugin.php' );


	/**
	 * Themehunk Sites Setup
	 *
	 * @since 1.0.5
	 */
	function ai_site_builder_admin_load() {
	require_once(AI_SITE_BUILDER_DIR_PATH . 'core/class-installation.php');
	require_once AI_SITE_BUILDER_DIR_PATH . 'core/class-admin-load.php';
	}

	add_action( 'init', 'ai_site_builder_admin_load' );

endif;