import { combineReducers } from "redux";
import SignInReducer from "./SignInReducer";
import CommonReducer from "./CommonReducer";
import CreateReducer from "./CreateReducer";
import SignUpReducer from "./SignUpReducer";


const RootReducer = combineReducers({
    signIn: SignInReducer,
    commonReducer: CommonReducer,
    createReducer:CreateReducer,
    signUpReducer:SignUpReducer,
})
export default RootReducer;