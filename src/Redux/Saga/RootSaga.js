import {all} from 'redux-saga/effects';
import SignInSaga from './SignInSaga';
import SignUpSaga from './SignUpSaga'
import VendorSaga from './VendorSaga';

function* RootSaga() {
    
yield all([
    SignInSaga(),
    SignUpSaga(),
    VendorSaga()
])
}
export default RootSaga;