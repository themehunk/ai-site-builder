import shopmania from '../../assets/json/th-shop-mania.json';
import gutenberg from '../../assets/json/gutenberg.json';
import jotshop from '../../assets/json/jotshop.json';
import bigstore from '../../assets/json/big-store.json';
import almaira from '../../assets/json/almaira.json';
import amazstore from '../../assets/json/amaz-store.json';
import featured from '../../assets/json/featured.json';
import gogo from '../../assets/json/gogo.json';
import mshop from '../../assets/json/m-shop.json';
import novelpro from '../../assets/json/novelpro.json';
import oneline from '../../assets/json/oneline.json';
import openmart from '../../assets/json/open-mart.json';
import openshop from '../../assets/json/openshop-pro.json';
import portfolioline from '../../assets/json/portfolioline.json';
import royalshop from '../../assets/json/royal-shop.json';
import shopline from '../../assets/json/shopline-pro.json';
import topstore from '../../assets/json/top-store-pro.json';
const jsonData = shopmania.concat(gutenberg,openshop,gogo,bigstore,portfolioline,mshop,oneline,topstore,jotshop,novelpro,amazstore,featured,openmart,royalshop);
// checking- almaira,shopline,

const gutenbergtmpl = ['th-shop-mania','blockline','blockline-pro','blur','blur-pro','gutenberg'];
const customizer = ['topstore','royal-shop','top-store-pro','big-store','openshop-pro','jotshop','open-mart','m-shop','shopline-pro','amaz-store','almaira','gogo','novelpro','oneline','portfolioline','featured'];
const elementor = ['th-shop-mania','elementor'];

const builderHandel = (builder) => {
        if (customizer.includes(builder)) {
            return 'customizer';
        } else if(elementor.includes(builder)){
            return 'elementor';
        } else if(gutenbergtmpl.includes(builder)){
            return 'gutenberg';
        }
}

const defaultJsonData = jsonData.filter(template => builderHandel(template.builder_theme) === 'elementor' && template.category.includes('all'));

const templateData = ( state = defaultJsonData, action) =>{

    switch(action.type){
        case "TEMPLATE_DATA" : return  jsonData.filter(template => builderHandel(template.builder_theme) === action.payload && template.category.includes(action.cate));

        default: return state;
    }

}

const templateSelect = ( state = {cate:'all',builder:'elementor'}, action) =>{

    switch(action.type){
        case "CATE_BUILDER" : return {cate:action.payload,builder:action.builderload};

        default: return state;
    }

}
const initialStateTF = false;

const trueFalse = ( state = initialStateTF, action) =>{
    switch(action.type){
        case "ACTION" : return action.payload;
        case "BUILDER" : return action.payload;

        default: return state;
    }

}

const tmplInstall = ( state = 'Installing Start', action) =>{
    switch(action.type){
        case "INSTALL" : return action.payload;
        default: return state;
    }

}

const stepLoad = ( state = {
    iframe:false,
    createWebsite:false,
    install:false,
    sucess:false
} , action) =>{

    switch(action.type){
        case "STEP1" : return {
    iframe:action.payload,
    createWebsite:false,
    install:false,
    success:false
}

    case "STEP2" : return {
    iframe:false,
    createWebsite:action.payload,
    install:false,
    success:false
}

case "STEP3" : return {
    iframe:false,
    createWebsite:false,
    install:action.payload,
    success:false
}

case "STEP4" : return {
    iframe:false,
    createWebsite:false,
    install:false,
    success:action.payload
}
        default: return state;
    }

}



// case "ADD" : return state.concat(action.payload);

// case "REMOVE" : return state.filter(function(initialState) { return initialState !== action.payload });

export {templateData, templateSelect, trueFalse,tmplInstall,stepLoad};

