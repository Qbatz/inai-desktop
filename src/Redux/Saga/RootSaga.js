import {all} from 'redux-saga/effects';
import SignInSaga from './SignInSaga';
import SignUpSaga from './SignUpSaga'


function* RootSaga() {
    
yield all([
    SignInSaga(),
    SignUpSaga(),
 
])
}
export default RootSaga;