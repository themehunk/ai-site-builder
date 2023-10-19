<?php
/**
 * Plugin Name:       	AI Site Builder
 * Plugin URI: 			https://wpzita.com/
 * Author:           	ThemeHunk
 * Author URI:			https://www.themehunk.com/
 * Version:           	1.0
 * Description:       	AI Site Builder: Effortlessly create stunning, user-friendly WordPress websites in minutes.
 * Text Domain:       	ai-site-builder
 *
 * @package           AISB
 */

//  Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if (defined( 'AI_SITE_BUILDER_PLUGIN_PRO' ) ) return;


define('AI_SITE_BUILDER_PLUGIN', 'ai-site-builder');

define('AI_SITE_BUILDER_PLUGIN_URL', plugin_dir_url(__FILE__));

if ( ! defined( 'AI_SITE_BUILDER_BASE_URL' ) ) {
	define( 'AI_SITE_BUILDER_DIR_PATH', plugin_dir_path(__FILE__ ) );
}

require_once(AI_SITE_BUILDER_DIR_PATH . 'admin/init.php');
require_once(AI_SITE_BUILDER_DIR_PATH . 'core/inc.php');
require_once(AI_SITE_BUILDER_DIR_PATH . 'app/app.php');
require_once AI_SITE_BUILDER_DIR_PATH . 'core/class-core.php';

register_activation_hook( __FILE__, 'ai_site_builder_active_plugin');
register_deactivation_hook( __FILE__, 'ai_site_builder_dactive_plugin');


