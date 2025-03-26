import {all} from 'redux-saga/effects';
import SignInSaga from './SignInSaga';
import CreateSaga from  './CreateSaga'
import SignUPSaga from './SignUpSaga';


function* RootSaga() {
    
yield all([
    SignInSaga(),
    CreateSaga(),
    SignUPSaga(),
])
}
export default RootSaga;