import { useState,useEffect  } from '@wordpress/element';

import shopmania from '../../../json/th-shop-mania.json';
import gutenberg from '../../../json/gutenberg.json';
import jotshop from '../../../json/jotshop.json';

import bigstore from '../../../json/big-store.json';
import SkeletonLoader from './skeleton-loader';
import { useSelector, useDispatch } from 'react-redux';
import {addTrueFalse} from '../actions';

export default function SiteTemplate(props) {
  const loader = useSelector((state)=>state.trueFalse);
  const dispatch = useDispatch();
  

const imageHandel = (template)=> {
  dispatch(addTrueFalse(false));

  // Get the modal
  var parsedData = JSON.parse(template);
  props.datatemp(parsedData);


  
 // var captionText = document.getElementById("sidebarModel");
  var captionIframe = document.getElementById("iframeModel");
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

// captionText.innerHTML = template;

// modalImg.src = parsedData.demo_url+'/?hide';

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// // When the user clicks on <span> (x), close the modal
//   span.onclick = function() { 
//     modal.style.display = "none";
//     document.body.style.overflow = "auto";
//     modalImg.src = '';
//   }

}

const tmplStyleHide = {
  display: 'none',
};

const tmplStyleShow = {
  display: 'block',
};

const customizer = ['big-store','open-shop'];
const elementor = ['th-shop-mania','elementor'];
const catearr = useSelector((state)=>state.changeCategory);

const catgeryMap = (cate,displayShow) =>{

  if(Object.values(cate).includes(catearr)){
    return displayShow;
  }else{
   return tmplStyleHide;
  }

  // Object.values(cate).map(value => {
  //       if(catearr.includes(value)){
  //         console.log(true);
  //       }else{
  //         console.log(false);
  //       }

    // catearr.includes(value)?displayShow:tmplStyleHide;
// })

}

const builderHandel = (builder,cate) => {



  if (customizer.includes(builder)) {
     builder = 'customizer';
  } else if(elementor.includes(builder)){
     builder = 'elementor';
  }
 

  if(props.builderHide===null || builder===props.builderHide){
    
    return  catgeryMap(cate,tmplStyleShow);
  }else{
    return tmplStyleHide;

  }

}




const finalObj = shopmania.concat(gutenberg,bigstore,jotshop);


console.log(finalObj);

    return (
        <div class="right-column">

{loader==false && <SkeletonLoader/>}

{loader && <div class="image-container">
    {jotshop.map((template) => {
        return (<div className={`column builder-${template.builder_theme}`} style={builderHandel(template.builder_theme,template.category)} onClick={() => imageHandel(JSON.stringify(template))} >
      <div className='asib-tmpl-column'><div class="aisb-tmpl-item" data-id={template.id}>
      </div>
      <img id="myImg" demourl={template.demo_url} src={template.thumb} alt={template.title} />
        <div className='asib-tmpl-footer'>
          <span>{template.title}</span>
          {template.free_paid =="paid" && <span className='aisb-pro'>PREMIUM</span>}
        </div>
      </div>
    </div>);
      })}
  </div>}
</div>
    );
  }