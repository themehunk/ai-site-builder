const initialState = "all";

const changeCategory = ( state = initialState, action) =>{

    switch(action.type){
        case "ADD" : return action.payload;

        case "REMOVE" : return action.payload;

        default: return state;
    }

}
const initialStateTF = true;

const trueFalse = ( state = initialStateTF, action) =>{
    switch(action.type){
        case "ACTION" : return action.payload;
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

export {changeCategory, trueFalse,tmplInstall,stepLoad};

