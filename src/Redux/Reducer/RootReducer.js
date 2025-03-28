import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import SignInReducer from "./SignInReducer";
import SignUpReducer from './SignUpReducer'


const RootReducer = combineReducers({
    signIn: SignInReducer,
    Common: CommonReducer,
    signUp: SignUpReducer
})
export default RootReducer;