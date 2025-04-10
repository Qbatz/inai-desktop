import { takeEvery, call, put } from "redux-saga/effects";
import { CreateAction, Verification, OtpSend, OtpVerified, AccountRegister } from "../Action/CreateAction";
import { ACCOUNT_REGISTER_SAGA, ACCOUNT_REGISTER_REDUCER, OTP_VERIFY_SAGA, OTP_VERIFY_REDUCER, OTP_SEND_REDUCER, OTP_SEND_SAGA, CREATE_ACCOUNT_API_CALL, ERROR_CODE, SUCCESS_CODE, SIGN_UP_VERIFICATION_SAGA, SIGN_UP_VERIFICATION_REDUCER } from "../../Utils/Constant";


function* handleCreateAccount(action) {

    try {
        const response = yield call(CreateAction, action.payload);

        if (response?.status && response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status} });
        }
        else if (response?.status === 400) {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Invalid request", statusCode: response.status } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong", statusCode: response.status } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}



function* handleVerification(action) {
    try {
        const response = yield call(Verification, action.payload);

        if (response?.status && response?.status === 200) {
            yield put({ type: SIGN_UP_VERIFICATION_REDUCER, payload: { is_verified: response.data.data.is_verified, emailId: response.data.data.email } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message, statusCode: response.status } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}

function* handleSendOtp(action) {
    try {
        const response = yield call(OtpSend, action.payload);
        if (response?.status && response?.status === 200) {
            yield put({ type: OTP_SEND_REDUCER, payload: { response: response.data } });
            yield put({ type: SUCCESS_CODE, payload: { message: response?.data?.message } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || response?.data?.message, statusCode: response.status } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}


function* handleOtpVerified(action) {
    try {
        const response = yield call(OtpVerified, action.payload);
        if (response?.status && response?.status === 200) {
            yield put({ type: OTP_VERIFY_REDUCER, payload: { response: response.data } });
            yield put({ type: SUCCESS_CODE, payload: { message: response?.data?.message, statusCode: response.status } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || response?.data?.message, statusCode: response.status } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}


function* handleAccountRegister(action) {
    try {
        const response = yield call(AccountRegister, action.payload);
       
        if (response?.status && response?.status === 200) {
            yield put({ type: ACCOUNT_REGISTER_REDUCER, payload: { response: response.data } });
            yield put({ type: SUCCESS_CODE, payload: { message: response?.data?.message, statusCode: response.status } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || response?.data?.message, statusCode: response.status } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}



function* CreateAccountSaga() {
    yield takeEvery(CREATE_ACCOUNT_API_CALL, handleCreateAccount);
    yield takeEvery(SIGN_UP_VERIFICATION_SAGA, handleVerification);
    yield takeEvery(OTP_SEND_SAGA, handleSendOtp);
    yield takeEvery(OTP_VERIFY_SAGA, handleOtpVerified);
    yield takeEvery(ACCOUNT_REGISTER_SAGA, handleAccountRegister);



}

export default CreateAccountSaga;
