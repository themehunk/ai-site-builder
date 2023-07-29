import { useState,useEffect  } from '@wordpress/element';

import shopmania from '../../../json/th-shop-mania.json';
import gutenberg from '../../../json/gutenberg.json';

import bigstore from '../../../json/big-store.json';


import { Skeleton } from '@mui/material';

export default function SiteTemplate(props) {
  
const imageHandel = (template)=> {
  // Get the modal
  var parsedData = JSON.parse(template);
  props.datatemp(parsedData);


  var modalImg = document.getElementById("iframetmpl");
 // var captionText = document.getElementById("sidebarModel");
  var captionIframe = document.getElementById("iframeModel");
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

// captionText.innerHTML = template;

// modalImg.src = parsedData.demo_url+'/?hide';

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modalImg.src = '';
  }

}

const tmplStyleHide = {
  display: 'none',
};

const tmplStyleShow = {
  display: 'block',
};

const customizer = ['big-store','open-shop'];
const elementor = ['th-shop-mania','elementor'];

const builderHandel = (builder,cate) => {


  if (customizer.includes(builder)) {
     builder = 'customizer';
  } else if(elementor.includes(builder)){
     builder = 'elementor';
  }

  if(props.builderHide===null || builder===props.builderHide){
    
    return tmplStyleShow;
  }else{
    return tmplStyleHide;

  }

}




var finalObj = shopmania.concat(gutenberg,bigstore);

console.log(finalObj);
    return (
        <div class="right-column">
    <div class="image-container">

    {finalObj.map((template) => {
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
  </div>
</div>
    );
  }