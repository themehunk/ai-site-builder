import { useState,useEffect  } from '@wordpress/element';
import SkeletonLoader from './skeleton-loader';
import SidebarCategory from './sidebarcategory';
import SiteTemplate from './sitetemplate';
import SidebarInstall from './sidebarInstall';
import { useSelector, useDispatch } from 'react-redux';
import {addCategory,removeCategory,stepOne,stepTwo,stepThree} from '../actions';
import InstallStart from './installStart';
import BuildWibsite from './buildwebsite';
import Success from './success';



export default function AiBuilder(props) {
  const myState = useSelector((state)=>state.changeCategory);
  const pageStep = useSelector((state)=>state.stepLoad);
  const dispatch = useDispatch();
  console.log(myState);
  const [ templateData, setTemplateData ] = useState(null);
  const [ iframeurl, setIframeUrl ] = useState(false);
  const [ loader, setLoaderl ] = useState(true);
  const [ nextBtn, setNextBtn ] = useState(true);
  const [ stepThree, setStepThree ] = useState(false);
  const [ iframeDisplay, setIframeDisplay ] = useState({display:"block"});
  
  const handeldata =  (jdata)=> {
    try {
      dispatch(stepOne(true));
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
        dispatch(stepTwo(true));
        setNextBtn(false);
       setStepThree(true);
       }


       console.log(pageStep);
    return (<>
        <div class="aisb-container-main-tmpl">
        {/* <SidebarCategory categoryAddRemove = {(ischecked,cate)=>categoryAddRemove(ischecked,cate)}/> */}
        <SiteTemplate  datatemp={(jdata)=>handeldata(jdata)} builderHide = {props.builder}/>
      </div>
      <div id="myModal" class="aisb-model modal">

          {pageStep.createWebsite &&  <BuildWibsite />}

         {pageStep.install && <InstallStart templateData={templateData} />}

         {  pageStep.success && <Success />}


        {  /*** demo show and next button click */}
      {pageStep.iframe &&  <div class="aisb-container-demo-tmpl theme-install-overlay-stop wp-full-overlay-stop expanded-stop">
              <div class="left-column wp-full-overlay-sidebar-stop" id="sidebarModel">
              
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