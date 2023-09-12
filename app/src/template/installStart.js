import { useState,useEffect } from '@wordpress/element';
import { Button, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import axios from 'axios';
import wpPlugins from '../../assets/json/plugins.json';
import animationLoading  from '../../assets/lottie/loading';
import animationProgress  from '../../assets/lottie/progress';
import ImportAPI from './importapi';
import { getQueryArg } from '@wordpress/url';
import { useSelector, useDispatch } from 'react-redux';
import {tmplLodaing} from '../actions';
import Lottie from 'react-lottie';
import { Logo, Upgrade } from '../aisb';

function getThemeData(type){

  let thCustomizer = 'themehunk-customizer';
  let hunkCompanion = 'hunk-companion';
  let zCompanion = 'z-companion';

const themeList = [ { 
  shopmania:[
  {
  type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'th-shop-mania-pro',builder:'elementor'
  }
],
gutenberg:[
  {
  type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'th-shop-mania-pro',builder:'gutenberg'
  }
],
topstore:[
{ 
  type:'theme', template: 'free', name: 'top-store',free:hunkCompanion,paid:'top-store-pro', builder:'customizer'
},
],
openshop:[
{ 
  type:'theme', template: 'free', name: 'open-shop',free:hunkCompanion,paid:'openshop-pro' , builder:'customizer'
},
],

openmart:[
{ 
  type:'plugin', template: 'free', name: 'open-mart',free:hunkCompanion,paid:'open-mart-pro' , builder:'customizer'
},
],

almaira:[
{ 
  type:'theme', template: 'free', name: 'almaira-shop',free:hunkCompanion,paid:'almaira' , builder:'customizer'
},
],

gogo:[
{ 
  type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'gogo-pro' , builder:'customizer'
},
],

portfolioline:[
  { 
    type:'theme', template: 'free', name: 'portfolioline',free:hunkCompanion,paid:'portfolioline' , builder:'customizer'
  },
],


amazstore:[
{ 
  type:'plugin', template: 'free', name: 'amaz-store',free:thCustomizer,paid:'amaz-store-pro' , builder:'customizer'
},
],


bigstore:[
{ 
  type:'plugin', template: 'free', name: 'big-store',free:thCustomizer,paid:'big-store-pro' , builder:'customizer'
},
],

jotshop:[
{ 
  type:'plugin', template: 'free', name: 'jot-shop',free:thCustomizer,paid:'jot-shop-pro' , builder:'customizer'
},
],

mshop:[
{ 
  type:'plugin', template: 'free', name: 'm-shop',free:thCustomizer,paid:'m-shop-pro', builder:'customizer'
},
],
shopline:[
{ 
  type:'theme', template: 'free', name: 'shopline',free:thCustomizer,paid:'shopline-pro', builder:'customizer'
},
],

oneline:[
{ 
  type:'theme', template: 'free', name: 'oneline',free:thCustomizer,paid:'oneline', builder:'customizer'
},
],

featured:[
{ 
  type:'theme', template: 'free', name: 'featured',free:thCustomizer,paid:'featured', builder:'customizer'
},
],
novelpro:[
  { 
    type:'theme', template: 'free', name: 'novellite',free:thCustomizer,paid:'novelpro', builder:'customizer'
  },
],
royalshop:[
  { 
    type:'theme', template: 'free', name: 'royal-shop',free:zCompanion,paid:'royal-shop-pro', builder:'customizer'
  },
]
}
];

switch(type){
  case "th-shop-mania" : return themeList[0].shopmania[0];
  case "gutenberg" : return themeList[0].gutenberg[0];
  case "openshop-pro" : return themeList[0].openshop[0];
  case "top-store-pro" : return themeList[0].topstore[0];
  case "zita-pro" : return themeList[0].zita[0];
  case "royal-shop" : return themeList[0].royalshop[0];
  case "amaz-store" : return themeList[0].amazstore[0];
  case "jotshop" : return themeList[0].jotshop[0];
  case "m-shop" : return themeList[0].mshop[0];
  case "big-store" : return themeList[0].bigstore[0];
  case "open-mart" : return themeList[0].openmart[0];
  case "oneline" : return themeList[0].oneline[0];
  case "featured" : return themeList[0].featured[0];
  case "almaira" : return themeList[0].almaira[0];
  case "shopline-pro" : return themeList[0].shopline[0];
  case "gogo" : return themeList[0].gogo[0];
  case "novelpro" : return themeList[0].novelpro[0];
  case "portfolioline" : return themeList[0].portfolioline[0];
  default: return  themeList[0].shopmania[0];
}

}


export default function installStart(props){
  const [ apiUrl, setApiUrl ] = useState(null);
  const dispatch = useDispatch();
  const lodaingMsg = useSelector((state)=>state.tmplInstall);

  // get theme name
  const getThemeName = () => {
    return getQueryArg( props.templateData.api_url, 'theme' );
  }

  const getPluginName = (type='') =>{
    const thmeType = getThemeData(props.templateData.builder_theme);

    if(type==='free'){
      
      return props.templateData.free_paid=='free'?thmeType.free:thmeType.paid;

    }else{
      return thmeType.type;
    }
  }

  const getBuilderName = (type='') =>{
    const thmeType = getThemeData(props.templateData.builder_theme);
    return thmeType.builder;
  }

  // plugin and theme install
        const process = async () =>{

          const params =  {
            templateType: props.templateData.free_paid,
            plugin: props.templateData.plugin,
            allPlugins:wpPlugins,
            builder:props.templateData.builder_theme,
            themeSlug:getThemeName(),
            proThemePlugin:getPluginName('free'),
            tmplFreePro:getPluginName()
          }      
            try {
                await axios.post(AISB.baseurl+'wp-json/ai/v1/ai-site-builder', {
                    params: {
                      templateType: props.templateData.free_paid,
                      plugin: props.templateData.plugin,
                      allPlugins:wpPlugins,
                      builder:props.templateData.builder_theme,
                      themeSlug:getThemeName(),
                      proThemePlugin:getPluginName('free'),
                      tmplFreePro:getPluginName()
                    }
                  })
                  .then(function (response) {
                    dispatch(tmplLodaing('Importing Server Data..'));
                    // console.log(response.data);
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
          dispatch(tmplLodaing('Getting Started...'));
          process();       
        }, []); // 👈️ empty dependencies array

        const defaultLoading = {
          loop: true,
          autoplay: true, 
          animationData: animationLoading,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };
        
        const defaultProgress = {
          loop: true,
          autoplay: true, 
          animationData: animationProgress,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };

return(<div className='aisb-site-build-wrap'>
  
  <div className='aisb-site-build'>
                <Flex className='header'>
                    <FlexItem>
                    <Logo/>
                    </FlexItem>

                    <FlexItem> <div className="header-text">
            <Upgrade/>
            </div></FlexItem>
                </Flex>
            </div>

            <div className='aisb-site-main'>
                <div className='aisb-site-form'>
                    <h2> Getting Your Site Ready ...</h2>
 
              <Lottie options={defaultLoading} height={300} />
              <Lottie options={defaultProgress} width={300} />

              {  apiUrl===null && <span className='loading-msg'>{lodaingMsg}</span>}
              {  apiUrl && <ImportAPI apiurl = {apiUrl}  />}


                </div>
            </div>
  </div>);


}