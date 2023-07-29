const initialState = 2;

const changeCategory = ( state = initialState, action) =>{

    switch(action.type){
        case "ADD" : return state+1;

        case "REMOVE" : return state-1;

        default: return state;
    }

}

export default changeCategory;

