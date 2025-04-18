import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import VendorReducer from "./VendorReducer";
import CustomerReducer from "./CustomerReducer";
import SettingsReducer from "./SettingsReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({

    Common: CommonReducer,
    vendor: VendorReducer,
    customer: CustomerReducer,
    settings: SettingsReducer,
    userInfo: UserReducer,
})
export default RootReducer;