import { useState,useEffect  } from '@wordpress/element';
import SkeletonLoader from './skeleton-loader';
import SidebarCategory from './sidebarcategory';
import SiteTemplate from './sitetemplate';
import SidebarInstall from './sidebarInstall';
import { useSelector, useDispatch } from 'react-redux';
import {addCategory,removeCategory} from '../actions';
import InstallStart from './installStart';




export default function AiBuilder(props) {
  const myState = useSelector((state)=>state.changeCategory);
  const dispatch = useDispatch();
  console.log(myState);
  const [ templateData, setTemplateData ] = useState(null);
  const [ iframeurl, setIframeUrl ] = useState(false);
  const [ loader, setLoaderl ] = useState(true);
  const [ nextBtn, setNextBtn ] = useState(true);
  const [ iframeDisplay, setIframeDisplay ] = useState({display:"block"});
  
  const handeldata =  (jdata)=> {
    try {
    document.body.style.overflow = "hidden";
    setIframeDisplay({display:"none"});
   // document.getElementById("iframetmpl").style.display = "none"; 
     setTemplateData(jdata);
    
    setLoaderl(true);
    setIframeUrl(jdata.demo_url+'/?hide');
    setTimeout(function() {
      frameload();
    }, 8000);


  } catch (error) {
    console.error('Error fetching data:', error);
  }

      }
     
      const frameload =  ()=> {
         setTimeout(function() {
          setLoaderl(false);
          setIframeDisplay({display:"block"});
       //   document.getElementById("iframetmpl").style.display = "block";
        }, 2000);
       
       }
       const categoryAddRemove = (ischecked,cate) =>{
        
          ischecked?dispatch(addCategory(cate)):dispatch(removeCategory(cate));
       }

      const installHandel = ()=>{
        setNextBtn(false)
          alert();
       }
    return (<>
        <div class="aisb-container-main-tmpl">
        <SidebarCategory categoryAddRemove = {(ischecked,cate)=>categoryAddRemove(ischecked,cate)}/>
        <SiteTemplate  datatemp={(jdata)=>handeldata(jdata)} builderHide = {props.builder}/>
      </div>
      <div id="myModal" class="modal">
      {nextBtn === false && <div> Installation start <InstallStart templateData={templateData} /></div>}


        {  /*** demo show and next button click */}
      {nextBtn &&  <div class="aisb-container-demo-tmpl theme-install-overlay wp-full-overlay expanded">
              <div class="left-column wp-full-overlay-sidebar" id="sidebarModel">
              
              {templateData !== null && <SidebarInstall templateData={templateData} installHandel = {()=>installHandel()}/>}

              </div>
              <div class="right-column-demo modal-content wp-full-overlay-main" id="iframeModel">
              {loader && <SkeletonLoader/>}
              
                <iframe onLoad={frameload} id="iframetmpl" src={iframeurl} height="100%" width="100%" frameborder="0" style={iframeDisplay}></iframe>
              </div>
          </div>}


      </div> 
      </>);
  }