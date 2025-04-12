import {all} from 'redux-saga/effects';
import SignInSaga from './SignInSaga';
import SignUpSaga from './SignUpSaga'
import VendorSaga from './VendorSaga';
import CustomerSaga from './CustomerSaga';
import SettingsSaga from './SettingsSaga';
import ProductSaga from './ProductSaga'

function* RootSaga() {
    
yield all([
    SignInSaga(),
    SignUpSaga(),
    VendorSaga(),
    CustomerSaga(),
    SettingsSaga(),
    ProductSaga(),
])
}
export default RootSaga;