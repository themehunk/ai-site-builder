<?php
/**
 * Plugin Name:       AI Site Builder
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.2
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       guten-blocks
 *
 * @package           create-block
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
