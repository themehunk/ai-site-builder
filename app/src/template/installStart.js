import { useState,useEffect } from '@wordpress/element';
import axios from 'axios';
import wpPlugins from '../../../json/plugins.json';
import ImportAPI from './importapi';
import { getQueryArg } from '@wordpress/url';
import { useSelector, useDispatch } from 'react-redux';
import {tmplLodaing} from '../actions';


export default function installStart(props){
  const [ apiUrl, setApiUrl ] = useState(null);
  const dispatch = useDispatch();
  const lodaingMsg = useSelector((state)=>state.tmplInstall);


  const getThemeName = () => {
    return getQueryArg( props.templateData.api_url, 'theme' );
  }


        const process = async () =>{
          console.log(getThemeName());
          dispatch(tmplLodaing('Theme & Plugin Installing...'));

            try {
                await axios.post(AISB.baseurl+'wp-json/ai/v1/ai-site-builder', {
                    params: {
                      plugin: props.templateData.plugin,
                      allPlugins:wpPlugins,
                      builder:props.templateData.builder_theme,
                      themeSlug:getThemeName()
                    }
                  })
                  .then(function (response) {
                    dispatch(tmplLodaing('Theme & Plugin Installation Completed.'));
                    console.log(response.data);
                    console.log('----------------- theme and plugin install completetd----------------------------\n');
                    setApiUrl(props.templateData.api_url);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
                  .finally(function () {
                    // always executed
                  });

            } catch (error) {
                console.error('Error fetching data:', error);
              }
        }


        useEffect(() => {
          process();       
        }, []); // 👈️ empty dependencies array

return(apiUrl && <ImportAPI apiurl = {apiUrl}  />);


}