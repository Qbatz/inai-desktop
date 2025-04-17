import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
// import SignInReducer from "./SignInReducer";
// import SignUpReducer from './SignUpReducer'
import VendorReducer from "./VendorReducer";
import CustomerReducer from "./CustomerReducer";
import SettingsReducer from "./SettingsReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
    // signIn: SignInReducer,
    Common: CommonReducer,
    // signUp: SignUpReducer,
    vendor: VendorReducer,
    customer: CustomerReducer,
    settings: SettingsReducer,
    userInfo: UserReducer,
})
export default RootReducer;