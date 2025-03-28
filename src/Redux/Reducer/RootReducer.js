import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";



const RootReducer = combineReducers({
   
    Common: CommonReducer,
    
})
export default RootReducer;