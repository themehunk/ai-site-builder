<?php // Exit if accessed directly.
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

				// Let extensions hook into saving.
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
        
            if ( in_array( $pagenow, array( 'themes.php' ), true ) ) {
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
        
            add_theme_page( $page_title, $page_title, $capability, $page_menu_slug, $page_menu_func );
        }


        public function admin_enqueue( $hook = '' ) {
            if ( 'appearance_page_'.self::$plugin_slug !== $hook ) {
				return;
			}
			wp_enqueue_style( 'ai-site-builder-admin', AI_SITE_BUILDER_PLUGIN_URL . 'menu-class/assets/css/admin.css', 1.0, 'true' );
            wp_enqueue_script('ai-site-builder-admin', AI_SITE_BUILDER_PLUGIN_URL . 'menu-class/assets/js/admin.js', array(), '1.0.0', 'true' );
            wp_enqueue_script( 'ai-site-builder-block-admin', AI_SITE_BUILDER_PLUGIN_URL . 'app/build/index.js', array( 'wp-element','wp-components', 'wp-i18n','wp-api-fetch','wp-url' ), '1.0', true );
           
            wp_localize_script( 'ai-site-builder-block-admin', 'AISB',
            array( 
                'ajaxurl' => admin_url( 'admin-ajax.php' ),
                'baseurl' => site_url( '/' ),
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
                <?php  
                //self::theme_install(); 
                
                //add_action( 'init', __CLASS__ . '::theme_install');    ?>
           <?php require_once(AI_SITE_BUILDER_DIR_PATH . 'menu-class/template.php'); ?>


        </div>

            </div>
            <?php
        }

         public function theme_install(){

            // If the function it's not available, require it.
                if ( ! function_exists( 'download_url' ) ) {
                    require_once ABSPATH . 'wp-admin/includes/file.php';
                }
                 WP_Filesystem();

            $temp_file = download_url('http://localhost/test/install/?api=abcd'); 
            $theme_dir = get_theme_root() . '/';
           // $theme_dir = WP_PLUGIN_DIR . '/';

            

            if (is_wp_error($temp_file)) {
                // Handle error
            } else {
                // Unzip the downloaded file
                $unzip_result = unzip_file($temp_file, $theme_dir);
            
                if (is_wp_error($unzip_result)) {
                    // Handle error
                } else {
                    $theme_slug = 'team'; // Replace with the theme slug
                    $theme_name = 'My Team Testing'; // Replace with the theme name
            
                    // Activate the theme
                    switch_theme($theme_slug);
            
                    // Update the theme name
                    $theme = wp_get_theme($theme_slug);
                    $theme->display('Name', $theme_name);
            
                    // Cleanup the temporary file
                    @unlink($temp_file);
            
                    // Theme installed and activated successfully
                }
            }



return;
                
            if (is_wp_error($theme)) {
                // Handle error
            } else {
                $tmp_file = $theme; //wp_tempnam($theme['body']);
               
                if (!is_wp_error($tmp_file) && $tmp_file) {
                    print_r($tmp_file);

                    $theme = wp_handle_sideload($tmp_file, array('test_form' => false));
                    $theme_name = sanitize_file_name($theme['file']);
                    print_r($theme);
                    $theme_data = get_file_data($theme['file'], array('Name' => 'team', 'Template' => 'Template'));
                    print_r($theme_data);
                    $new_theme = array(
                        'post_title'    => $theme_data['Name'],
                        'post_status'   => 'publish',
                        'post_type'     => 'theme'
                    );
                    
                    $theme_id = wp_insert_post($new_theme);
                   print_r($theme_id);
                    if ($theme_id) {
                        update_post_meta($theme_id, 'template', $theme_data['Template']);
                        update_post_meta($theme_id, '_wp_page_template', 'default'); // Set the default template if needed
                        update_post_meta($theme_id, '_theme_name', $theme_data['Name']);
                        // Other theme meta data can be set as needed
                        
                        // Theme installed successfully
                        echo "succsess instal theme";
                    } else {
                        // Handle error
                    }
                } else {
                    // Handle error
                }
            }


        }




    }

    new AI_SITE_BUILDER_MENU;
}