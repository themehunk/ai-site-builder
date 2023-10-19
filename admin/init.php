<?php 
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
	
// Exit if accessed directly.
if ( ! class_exists( 'AI_SITE_BUILDER_MENU' ) ) {

    /**
	 * AI SITE builder Admin Menu Settings
	 */
    class AI_SITE_BUILDER_MENU {

        static public $plugin_slug = 'ai-site-builder';

        function __construct()
        {

            if ( ! is_admin() ) {
				return;
			}
            add_action( 'init', __CLASS__ . '::permalink_update');

			add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue' ) );
            add_action( 'init', __CLASS__ . '::init_admin_settings', 99 );
            add_action('admin_head', array( $this,'admin_icon_style'));


        }



      



        function admin_icon_style() {
        $style =  '<style>#adminmenu .toplevel_page_ai-site-builder .wp-menu-image img { padding: 2px 0 0;}</style>';
        $arr = array( 'style' => array());
        echo wp_kses( $style, $arr );
        
        }


        static public function permalink_update(){

            if ( get_option('permalink_structure') ) return;
                            // The new permalink structure you want to set
                $new_permalink_structure = '/%postname%/';

                // Update the permalink structure option
                update_option('permalink_structure', $new_permalink_structure);

                // Flush rewrite rules to apply the changes
                flush_rewrite_rules();
        }


        /**
		 * Admin settings init
		 */
		static public function init_admin_settings() {

            if ( isset( $_REQUEST['page'] ) && strpos( $_REQUEST['page'], self::$plugin_slug ) !== false ) {
				self::save_settings();
			}

            add_action( 'admin_menu', __CLASS__ . '::add_admin_menu', 100 );
        }


        	/**
		 * Save All admin settings here
		 */
		static public function save_settings() {

			// Only admins can save settings.
			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}
		}


        
        /**
		 * Admin class add
		 *
		 * @since 1.0.0
		 */
        

        static public function admin_classes( $classes ) {
            global $pagenow;
            //themes.php
            if ( in_array( $pagenow, array( 'admin.php' ), true ) ) {

                if(is_admin() && isset($_GET['template']) && 'step'=== sanitize_text_field( $_GET['template']) )
                
                $classes .= ' ai-site-builder';
            }

            return $classes;
        }


        /**
		 * Admin Menu - theme panel
		 *
		 * @since 1.0.0
		 */
        

        static public function add_admin_menu() {

            add_action( 'admin_body_class', __CLASS__ . '::admin_classes');     

            $parent_page    = 'themes.php';
            $page_title     = __('AI Site Builder','ai-site-builder');
            $capability     = 'manage_options';
			$page_menu_slug = self::$plugin_slug;
            $page_menu_func =   __CLASS__ . '::menu_callback';
        
           // add_theme_page( $page_title, $page_title, $capability, $page_menu_slug, $page_menu_func );


            add_menu_page( 
                $page_title,
                $page_title,
                $capability,
                $page_menu_slug,
                $page_menu_func,
                plugins_url( 'ai-site-builder/app/assets/svg/icon.svg' ),
                6
            ); 
        }


        public function admin_enqueue( $hook = '' ) {
            if ( 'toplevel_page_'.self::$plugin_slug !== $hook ) {
				return;
			}
			wp_enqueue_style( 'ai-site-builder-admin', AI_SITE_BUILDER_PLUGIN_URL . 'admin/assets/css/admin.css', 1.0, 'true' );
            wp_enqueue_script( 'ai-site-builder-block-admin', AI_SITE_BUILDER_PLUGIN_URL . 'app/build/index.js', array( 'wp-element','wp-components', 'wp-i18n','wp-api-fetch','wp-url' ), '1.0', true );
           
            wp_localize_script( 'ai-site-builder-block-admin', 'AISB',
            array( 
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'baseurl' => site_url( '/' ),
                'pluginpath'=>AI_SITE_BUILDER_PLUGIN_URL,
                'upgrade'=> esc_url('https://wpzita.com')           
                 )
        );

        }
        /**
		 * Menu callback
		 *
		 * @since 1.0.0
		 */
        
         static public function menu_callback() {
            ?>
            <div class="themehunk-sites-menu-page-wrapper">
           <?php require_once(plugin_dir_path(__FILE__ ) . 'template.php'); ?>
            </div>
            <?php
        }

    }

    new AI_SITE_BUILDER_MENU;
}


function ai_site_builder_active_plugin(){
    $url =  'https://wpzita.com/wp-json/wp/v2/shop-site';
    $args_for_get = array(
        'stream' => true,
        'website'=>home_url().'/?aisb_active',
        'active'=>date('Y-m-d g:i:s'),
        'deactive'=>'',
    );
    $url = add_query_arg( $args_for_get, esc_url_raw( $url ) );
     $response = wp_remote_get( esc_url_raw( $url ),array( 'timeout' => 120) );

    }

    function ai_site_builder_dactive_plugin(){
        $url =  'https://wpzita.com/wp-json/wp/v2/shop-site';
        $args_for_get = array(
            'stream' => false,
            'website'=>home_url().'/?aisb_deactive',
            'active'=>date('Y-m-d g:i:s'),
            'deactive'=>'',
        );
        $url = add_query_arg( $args_for_get, esc_url_raw( $url ) );
         $response = wp_remote_get( esc_url_raw( $url ),array( 'timeout' => 120) );
    
        }
    
