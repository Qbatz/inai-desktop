import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import SignInReducer from "./SignInReducer";


const RootReducer = combineReducers({
    signIn: SignInReducer,
    Common: CommonReducer,
    
})
export default RootReducer;