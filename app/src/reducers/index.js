import { combineReducers } from 'redux';
import {changeCategory,trueFalse,tmplInstall,stepLoad} from "./temperature";


const rootReducer = combineReducers( { changeCategory,trueFalse,tmplInstall,stepLoad } );

export default rootReducer;