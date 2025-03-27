import { takeEvery, call, put } from "redux-saga/effects";
import { signIn, ForgotAction } from "../Action/SignInAction";
import {
    SIGN_IN_REDUCER, SIGN_IN_SAGA, ERROR_CODE, FORGOT_PASSWORD_API_CALL,
    SUCCESS_CODE,FORGOT_USER_API_CALL
} from "../../Utils/Constant";


function* handleSignIn(action) {
    const response = yield call(signIn, action.payload)
    if (response.status === 200 || response.data.statusCode === 200) {
        yield put({ type: SIGN_IN_REDUCER, payload: { response: response.data } })

    }
    if (response.status === 201 || response.data.statusCode === 201) {
        yield put({ type: ERROR_CODE, payload: { message: response.data.message } })
    }

}


function* handleForgotPassword(forgot) {
 
    
      try {
            const response = yield call(ForgotAction, forgot.payload);
          
    
    
            if (response?.success || response?.status === 200) {
                
                yield put({ type: SUCCESS_CODE, payload: { response } });
            }
    
            else if (response?.status === 400) {
              
                yield put({ type: ERROR_CODE, payload: { message: response?.message || "Invalid request" } });
            }
    
            else {
              
                yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong" } });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
          
            yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
        }
}


function* handleForgotUser(user) {
    const response = yield call(ForgotAction, user.payload)
    
    if (response.status === 200 || response.data.statusCode === 200) {
        yield put({ type: SUCCESS_CODE, payload: { response: response } })

    }
    if (response.status === 400 || response.data.statusCode === 400) {
        yield put({ type: ERROR_CODE, payload: { message: response.data.message } })
    }
}

function* SignInSaga() {
    yield takeEvery(SIGN_IN_SAGA, handleSignIn);
    yield takeEvery(FORGOT_PASSWORD_API_CALL, handleForgotPassword);
    yield takeEvery(FORGOT_USER_API_CALL, handleForgotUser);
}

export default SignInSaga;