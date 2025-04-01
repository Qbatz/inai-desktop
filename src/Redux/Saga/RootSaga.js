import {all} from 'redux-saga/effects';
import SignInSaga from './SignInSaga';
import SignUpSaga from './SignUpSaga'
import VendorSaga from './VendorSaga';
import CustomerSaga from './CustomerSaga';

function* RootSaga() {
    
yield all([
    SignInSaga(),
    SignUpSaga(),
    VendorSaga(),
    CustomerSaga()
])
}
export default RootSaga;