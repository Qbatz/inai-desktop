import { takeEvery, call, put } from "redux-saga/effects";
import { signIn, ForgotAction } from "../Action/SignInAction";
import { SIGN_IN_REDUCER, SIGN_IN_SAGA, ERROR_CODE, FORGOT_PASSWORD_RESPONSE, FORGOT_PASSWORD_API_CALL } from "../../Utils/Constant";


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
    const response = yield call(ForgotAction, forgot.payload)
    console.log("response", response);
    if (response.status === 200 || response.data.statusCode === 200) {
        yield put({ type: FORGOT_PASSWORD_RESPONSE, payload: { response: response.data } })

    }
    if (response.status === 400 || response.data.statusCode === 400) {
        yield put({ type: ERROR_CODE, payload: { message: response.data.message } })
    }
}


function* SignInSaga() {
    yield takeEvery(SIGN_IN_SAGA, handleSignIn);
    yield takeEvery(FORGOT_PASSWORD_API_CALL, handleForgotPassword);
}

export default SignInSaga;