import { combineReducers } from 'redux';
import {changeCategory,trueFalse,tmplInstall} from "./temperature";


const rootReducer = combineReducers( { changeCategory,trueFalse,tmplInstall } );

export default rootReducer;