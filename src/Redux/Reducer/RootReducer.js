import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import SignInReducer from "./SignInReducer";
import SignUpReducer from './SignUpReducer'
import VendorReducer from "./VendorReducer";

const RootReducer = combineReducers({
    signIn: SignInReducer,
    Common: CommonReducer,
    signUp: SignUpReducer,
    vendor: VendorReducer
})
export default RootReducer;