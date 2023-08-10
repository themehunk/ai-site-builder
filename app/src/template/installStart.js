import { useState,useEffect } from '@wordpress/element';
import { Button, Flex, FlexBlock, FlexItem,  __experimentalText as Text,
  __experimentalVStack as VStack, CheckboxControl  } from '@wordpress/components';
import axios from 'axios';
import wpPlugins from '../../../json/plugins.json';
import animationLoading  from '../../../json/lottie/loading';
import animationProgress  from '../../../json/lottie/progress';
import ImportAPI from './importapi';
import { getQueryArg } from '@wordpress/url';
import { useSelector, useDispatch } from 'react-redux';
import {tmplLodaing} from '../actions';
import { Icon, arrowRight,chevronLeftSmall } from '@wordpress/icons';
import Lottie from 'react-lottie';
import { HomeLink, Logo, Upgrade } from '../aisb';

function getThemeData(type){

  let thCustomizer = 'themehunk-customizer';
  let hunkCompanion = 'hunk-companion';

  
const themeList = [ { 
  shopmania:[
  {
  type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'th-shop-mania-pro'
  }
],
gutenberg:[
  {
  type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'th-shop-mania-pro'
  }
],
topstore:[
{ 
  type:'theme', template: 'free', name: 'top-store',free:hunkCompanion,paid:'top-store-pro' 
},
],
openshop:[
{ 
  type:'theme', template: 'free', name: 'open-shop',free:hunkCompanion,paid:'openshop-pro' 
},
],

openmart:[
{ 
  type:'plugin', template: 'free', name: 'open-mart',free:hunkCompanion,paid:'open-mart-pro' 
},
],

almaira:[
{ 
  type:'theme', template: 'free', name: 'almaira-shop',free:hunkCompanion,paid:'almaira' 
},
],

gogo:[
{ 
  type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'gogo-pro' 
},
],

portfolioline:[
  { 
    type:'theme', template: 'free', name: 'portfolioline',free:hunkCompanion,paid:'portfolioline' 
  },
],


amazstore:[
{ 
  type:'plugin', template: 'free', name: 'amaz-store',free:thCustomizer,paid:'amaz-store-pro' 
},
],


bigstore:[
{ 
  type:'plugin', template: 'free', name: 'big-store',free:thCustomizer,paid:'big-store-pro' 
},
],

jotshop:[
{ 
  type:'plugin', template: 'free', name: 'jot-shop',free:thCustomizer,paid:'jot-shop-pro' 
},
],

mshop:[
{ 
  type:'plugin', template: 'free', name: 'm-shop',free:thCustomizer,paid:'m-shop-pro'
},
],
shopline:[
{ 
  type:'theme', template: 'free', name: 'shopline',free:thCustomizer,paid:'shopline-pro'
},
],

oneline:[
{ 
  type:'theme', template: 'free', name: 'oneline',free:thCustomizer,paid:'oneline'
},
],

featured:[
{ 
  type:'theme', template: 'free', name: 'featured',free:thCustomizer,paid:'featured'
},
],
novelpro:[
  { 
    type:'self', template: 'free', name: 'novellite',free:thCustomizer,paid:'novelpro'
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

  // plugin and theme install
        const process = async () =>{

  
          console.log(props.templateData.plugin);
          dispatch(tmplLodaing('Theme & Plugin Installing...'));

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
                <Flex>
                    <FlexItem>
                    <Logo/>
                    </FlexItem>

                    <FlexItem> <div className="header-text">
            <Upgrade/>
            <HomeLink/>
            </div></FlexItem>
                </Flex>
            </div>

            <div className='aisb-site-main'>
                <div className='aisb-site-form'>
                    <h2> Getting Your Site Ready ...</h2>
 
              <Lottie options={defaultLoading} height={300} />
              <Lottie options={defaultProgress} width={300} />
              {  apiUrl && <ImportAPI apiurl = {apiUrl}  />}
                </div>
            </div>
  </div>);


}