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



const themelist = ()=>{

    const colors = [
        { color: '#f00', name: 'Red' },
        { color: '#0f0', name: 'Green' },
        { color: '#00f', name: 'Blue' },
    ];

}

const getPorFreePlugin = ( state = 'th-shop-mania', action) =>{
    switch(action.type){
        case "INSTALL" : return action.payload;
        default: return state;
    }

}


// case "ADD" : return state.concat(action.payload);

// case "REMOVE" : return state.filter(function(initialState) { return initialState !== action.payload });

export {changeCategory, trueFalse,tmplInstall};

