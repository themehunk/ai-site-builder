import { useState,useEffect  } from '@wordpress/element';
import SkeletonLoader from './skeleton-loader';
import SidebarCategory from './sidebarcategory';
import SiteTemplate from './sitetemplate';
import { Button } from '@mui/material';

export default function AiBuilder(props) {

  const [ templateData, setTemplateData ] = useState(null);
  const [ iframeurl, setIframeUrl ] = useState(false);
  const [ loader, setLoaderl ] = useState(true);

  const handeldata = (jdata)=> {
    document.body.style.overflow = "hidden";

    setTemplateData(jdata);
    document.getElementById("iframetmpl").style.display = "none";
    setLoaderl(true);
    setIframeUrl(jdata.demo_url+'/?hide');
   
    setTimeout(function() {
      frameload();
    }, 8000);

      }

      const frameload =  ()=> {
         setTimeout(function() {
          setLoaderl(false);
          document.getElementById("iframetmpl").style.display = "block";
        }, 2000);
       
       }
    return (<>
        <div class="aisb-container-main-tmpl">
        <SidebarCategory/>
        <SiteTemplate  datatemp={(jdata)=>handeldata(jdata)} builderHide = {props.builder}/>
      </div>
      <div id="myModal" class="modal">
          <div class="aisb-container-demo-tmpl theme-install-overlay wp-full-overlay expanded">
              <div class="left-column wp-full-overlay-sidebar" id="sidebarModel">
              <span class="close">&times;</span>
              Logo
Choose a logo for your site. You can update it anytime later.

          <Button variant="contained">Contained</Button>
                {console.log(templateData)}
              </div>
              <div class="right-column-demo modal-content wp-full-overlay-main" id="iframeModel">
              {loader && <SkeletonLoader/>}
              
                <iframe onLoad={frameload} id="iframetmpl" src={iframeurl} height="100%" width="100%" frameborder="0" ></iframe>
              </div>
          </div>
      </div>
      </>);
  }