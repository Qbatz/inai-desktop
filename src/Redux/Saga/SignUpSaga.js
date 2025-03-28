import { takeEvery, call, put } from "redux-saga/effects";
import { CreateAction, Verification, OtpSend } from "../Action/CreateAction";
import { OTP_SEND_REDUCER, OTP_SEND_SAGA, CREATE_ACCOUNT_API_CALL, ERROR_CODE, SUCCESS_CODE, SIGN_UP_VERIFICATION_SAGA, SIGN_UP_VERIFICATION_REDUCER } from "../../Utils/Constant";


function* handleCreateAccount(action) {

    try {
        const response = yield call(CreateAction, action.payload);

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


function* handleVerification(action) {
    try {
        const response = yield call(Verification, action.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SIGN_UP_VERIFICATION_REDUCER, payload: { is_verified: response.data.data.is_verified } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
    }
}

function* handleSendOtp(action) {
    try {
        const response = yield call(OtpSend, action.payload);
        console.log("response", response)
        if (response?.success || response?.status === 200) {
            yield put({ type: OTP_SEND_REDUCER, payload: { response: response.data } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
    }
}



function* CreateAccountSaga() {
    yield takeEvery(CREATE_ACCOUNT_API_CALL, handleCreateAccount);
    yield takeEvery(SIGN_UP_VERIFICATION_SAGA, handleVerification);
    yield takeEvery(OTP_SEND_SAGA, handleSendOtp);

}

export default CreateAccountSaga;
