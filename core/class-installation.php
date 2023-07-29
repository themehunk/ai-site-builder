<?php // Exit if accessed directly.
if ( ! class_exists( 'AI_SITE_BUILDER_SETUP' ) ) {

    // Check if needed functions exists - if not, require them
if ( ! function_exists( 'get_plugins' ) || ! function_exists( 'is_plugin_active' ) ) {
    require_once ABSPATH . 'wp-admin/includes/plugin.php';
}


    class AI_SITE_BUILDER_SETUP {

        function __construct($params)
        {

         self::init_admin_settings($params);
           
        }


           /**
		 * Admin settings init
		 */
		static public function init_admin_settings($params) {

            $installplugin = $params['plugin'];

            $allplugins = $params['allPlugins'][0];
            $theme = $params['themeSlug'];

            self::theme_install($theme);
            self::plugin_install($installplugin,$allplugins);
        }


        static public function plugin_install($plugin,$allplugins){

            foreach($plugin as $slug => $value){

                $init = $allplugins[$slug];

            
                if(self::is_plugin_installed_check($init)){

                        if(self::is_plugin_active_check($init)){
                        }else{
                            // plugin activation code
                            activate_plugin( $init );
                        }

                }else{
                    //plugin install and acitvation code
                    self::init_plugin($slug,$init);

                }
                
            }

        }

        static public function theme_install($theme_slug){

            if(get_option( 'template' )===$theme_slug) return 1;
            $installed_themes = wp_get_themes();
            $theme_exist =  isset($installed_themes[$theme_slug]);
            
             if ($theme_exist) {
                  //Activate the theme
                     switch_theme($theme_slug);
                  // Update the theme name
                 // $theme = wp_get_theme($theme_slug);
                return 2;

                } else {
                self::init_theme($theme_slug);

               return 3;
            }

        }


        /** Plugin Install check */

        static public function is_plugin_installed_check($plugin_slug){
            $installed_plugins = get_plugins();
            return array_key_exists( $plugin_slug, $installed_plugins ) || in_array( $plugin_slug, $installed_plugins, true );

        }

           /** Plugin active check */

           static public function is_plugin_active_check($plugin_slug){
           
            if ( is_plugin_active( $plugin_slug ) ) {
                return true;
            }

            return false;

        }


        static public function run_activate_plugin( $plugin ) {
            $plugin = trim( $plugin );
            $current = get_option( 'active_plugins' );
            $plugin = plugin_basename( $plugin );
        
            if ( !in_array( $plugin, $current ) ) {
                $current[] = $plugin;
                sort( $current );
                do_action( 'activate_plugin', $plugin );
                update_option( 'active_plugins', $current );
                do_action( 'activate_' . $plugin );
                do_action( 'activated_plugin', $plugin );
            }
        
            return null;
        }


        /**
		 * Theme init
		 */
		static public function init_theme($theme_slug) {


                // If the function it's not available, require it.
                if ( ! function_exists( 'download_url' ) ) {
                    require_once ABSPATH . 'wp-admin/includes/file.php';
                }
                WP_Filesystem();

                $wp = 'https://downloads.wordpress.org/theme/'.$theme_slug.'.zip';
                $server = 'http://localhost/test/install/?api=abcd';

                $temp_file = download_url($wp); 


                $theme_dir = get_theme_root() . '/';



                if (is_wp_error($temp_file)) {
                // Handle error
                } else {
                // Unzip the downloaded file
                $unzip_result = unzip_file($temp_file, $theme_dir);

                if (is_wp_error($unzip_result)) {
                    // Handle error
                } else {

                    //Activate the theme
                    switch_theme($theme_slug);

                    // Update the theme name
                  //  $theme = wp_get_theme($theme_slug);

                    // Cleanup the temporary file
                    @unlink($temp_file);

                    return true;
                    // Theme installed and activated successfully
                }
                }
 
        }

           /**
		 * Theme init
		 */
		static public function init_plugin($slug,$init) {

            
            // If the function it's not available, require it.
            if ( ! function_exists( 'download_url' ) ) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }
            WP_Filesystem();

            $temp_file = download_url('https://downloads.wordpress.org/plugin/'.$slug.'.zip'); 

            $theme_dir = WP_PLUGIN_DIR . '/';

            if (is_wp_error($temp_file)) {
                // Handle error
            } else {
                // Unzip the downloaded file
                $unzip_result = unzip_file($temp_file, $theme_dir);

                if (is_wp_error($unzip_result)) {
                    // Handle error
                } else {
                    // Cleanup the temporary file
                    @unlink($temp_file);

                    self::run_activate_plugin($init);
                    return true;
                    // Theme installed and activated successfully
                }
            }

 
        }


    }


}