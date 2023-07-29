<?php
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 function my_plugin_enqueue_scripts() {



	//wp_enqueue_style( 'blockline-settings-css', get_template_directory_uri() . '/theme-option/build/style-index.css', array(), '1.0.0', false );

    wp_enqueue_script( 'ai-site-builder-block-admin', AI_SITE_BUILDER_PLUGIN_URL . 'src/build/index.js', array( 'wp-element', 'wp-i18n','wp-api-fetch' ), '1.0', true );

  

  }
  
  //add_action( 'wp_enqueue_scripts', 'my_plugin_enqueue_scripts' );


  add_action( 'rest_api_init', function () {
    register_rest_route( 'ai/v1', 'ai-site-builder', array(
        'methods' => 'POST',
        'callback' => 'ai_site_builder_install',
        'permission_callback' => '__return_true',
    ) );
} );


function ai_site_builder_install(WP_REST_Request $request){
  $request = $request->get_params();
  $params  = $request['params'];

  // $status = install_theme();
  // $statusp = install_plugin();

  new AI_SITE_BUILDER_SETUP($params);

  $woo_api = array(
          'base_url' => site_url(),
      );

        echo  json_encode($woo_api);
    }

    

    add_action( 'rest_api_init', function () {
        register_rest_route( 'ai/v1', 'ai-site-import', array(
            'methods' => 'POST',
            'callback' => 'ai_site_builder_import',
            'login_user_id' => get_current_user_id(),
            'permission_callback' => '__return_true',
        ) );
    } );
    
    
    function ai_site_builder_import(WP_REST_Request $request){
      
      $atrs = $request->get_attributes();
      $request = $request->get_params();
      $params  = $request['params'];
       
      new AI_SITE_BUILDER_IMPORT($params,$atrs['login_user_id']);
    
      $woo_api = array(
              'base_url' => site_url(),
          );
    
            echo  json_encode($woo_api);
        }


        function ai_site_builder_ajax_handler_data() {
          $data = array(
              'message' => 'Data received successfully!',
              'data'    => stripslashes($_POST['data']),
              'userid' =>get_current_user_id()
          );
  
          $data = stripslashes( $_POST['data']);
          $return = json_decode($data)->data;
         // Themehunk_Library_WXR_Importer::instance()->get_xml_data( $xml_path['data']['file'] );
          AI_SITE_BUILDER_IMPORT::instance()->get_import_data($return);


         wp_send_json_success( $return );
      }
      add_action( 'wp_ajax_ai_site_builder_ajax_handler_data', 'ai_site_builder_ajax_handler_data' );
      add_action( 'wp_ajax_ai_site_builder_ajax_handler_data', 'ai_site_builder_ajax_handler_data' );



        function ai_site_builder_ajax_import_xml() {

           $data = stripslashes( $_POST['data']);
           $data = json_decode($data)->data;
       
         AI_SITE_BUILDER_IMPORT::instance()->import_xml_data($data);
          wp_send_json_success( $data );


      }
      add_action( 'wp_ajax_ai_site_builder_ajax_import_xml', 'ai_site_builder_ajax_import_xml' );
      add_action( 'wp_ajax_nopriv_ai_site_builder_ajax_import_xml', 'ai_site_builder_ajax_import_xml' );



      function ai_site_builder_ajax_cutomizer() {
        $data = array(
            'message' => 'Customizer Data received successfully!',
            'data'    => stripslashes($_POST['data'])
        );

         $data = stripslashes( $_POST['data']);
           $data = json_decode($data)->data;
       AI_SITE_BUILDER_IMPORT::instance()->import_customizer($data);
       //wp_send_json_success( $data );
    }
    add_action( 'wp_ajax_ai_site_builder_ajax_cutomizer', 'ai_site_builder_ajax_cutomizer' );
    add_action( 'wp_ajax_ai_site_builder_ajax_cutomizer', 'ai_site_builder_ajax_cutomizer' );


    function ai_site_builder_aimport_options() {
      $data = array(
          'message' => 'options Data received successfully!',
          'data'    => stripslashes($_POST['data'])
      );

       $data = stripslashes( $_POST['data']);
         $data = json_decode($data)->data;

     AI_SITE_BUILDER_IMPORT::instance()->import_options($data);
     exit();
    // wp_send_json_success( $data );
  }
  add_action( 'wp_ajax_ai_site_builder_aimport_options', 'ai_site_builder_aimport_options' );
  add_action( 'wp_ajax_ai_site_builder_aimport_options', 'ai_site_builder_aimport_options' );
    


  function ai_site_builder_import_widgets() {
    $data = array(
        'message' => 'options Data received successfully!',
        'data'    => stripslashes($_POST['data'])
    );

     $data = stripslashes( $_POST['data']);
       $data = json_decode($data)->data;

   AI_SITE_BUILDER_IMPORT::instance()->import_widgets($data);
   exit();
  // wp_send_json_success( $data );
}
add_action( 'wp_ajax_ai_site_builder_import_widgets', 'ai_site_builder_import_widgets' );
add_action( 'wp_ajax_ai_site_builder_import_widgets', 'ai_site_builder_import_widgets' );
      



    