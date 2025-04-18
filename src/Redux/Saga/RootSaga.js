import {all} from 'redux-saga/effects';
import VendorSaga from './VendorSaga';
import CustomerSaga from './CustomerSaga';
import SettingsSaga from './SettingsSaga';
import UserSaga from './UserSaga';

function* RootSaga() {
    
yield all([

    VendorSaga(),
    CustomerSaga(),
    SettingsSaga(),
    UserSaga(),
])
}
export default RootSaga;