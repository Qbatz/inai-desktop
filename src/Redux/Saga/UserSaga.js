import { takeEvery, call, put } from "redux-saga/effects";
import { refreshToken } from "../../Token_Access/Token";
import { GetActivities, signIn, ForgotAction, ForgotPasswordAction, ReSetPageAction, ReSetPassword, CreateAction, Verification, OtpSend, OtpVerified, AccountRegister, GetUserInfo } from "../Action/UserAction";
import {
    GET_ACTIVITIES_SAGA,GET_ACTIVITIES_REDUCER,
    SIGN_IN_REDUCER, SIGN_IN_SAGA, FORGOT_PASSWORD_API_CALL,
    FORGOT_USER_API_CALL, RESET_PAGE_API_CALL, RESET_PASSWORD_API_CALL, ACCOUNT_REGISTER_SAGA, ACCOUNT_REGISTER_REDUCER, OTP_VERIFY_SAGA, OTP_VERIFY_REDUCER, OTP_SEND_REDUCER, OTP_SEND_SAGA, CREATE_ACCOUNT_API_CALL, ERROR_CODE, SUCCESS_CODE, SIGN_UP_VERIFICATION_SAGA, SIGN_UP_VERIFICATION_REDUCER, GET_USER_INFO_REDUCER, GET_USER_INFO_SAGA,
} from "../../Utils/Constant";

function* handleSignIn(action) {
    try {
        const response = yield call(signIn, action.payload);
        if (response.status === 200) {
            yield put({ type: SIGN_IN_REDUCER, payload: { token: response.data.access } });
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status } });

        } else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.detail, statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}

function* handleForgotPassword(forgot) {
    try {
        const response = yield call(ForgotAction, forgot.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong", statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}


function* handleForgotUser(user) {
    try {
        const response = yield call(ForgotPasswordAction, user.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong", statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}

function* handleResetPage(reset) {
    try {

        const response = yield call(ReSetPageAction, reset.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response , statusCode: response.status  } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong", statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}

function* handleResetPassword(verify) {
    try {
        const response = yield call(ReSetPassword, verify.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong", statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}

function* handleCreateAccount(action) {

    try {
        const response = yield call(CreateAction, action.payload);

        if (response?.status && response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status } });
        }
        else if (response?.status === 400) {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Invalid request", statusCode: response.status } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong", statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
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
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
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
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
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
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
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
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}


function* handleGetUserInfo() {
    try {
        const response = yield call(GetUserInfo);

        if (response.status === 200) {
            yield put({ type: GET_USER_INFO_REDUCER, payload: { users: response.data } });
        } else if (response.status === 201) {
            yield put({
                type: ERROR_CODE,
                payload: {
                    message: response.data.message || response.message,
                    statusCode: response.status,
                },
            });
        }

        if (response) {
            refreshToken(response);
        }

    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}



function* handleGetActivities(action) {
    try {
        const response = yield call(GetActivities, action.payload);

        if (response?.status && response?.status === 200) {
            yield put({ type: GET_ACTIVITIES_REDUCER, payload: { response: response.data.activites } });
            yield put({ type: SUCCESS_CODE, payload: { message: response?.data?.message, statusCode: response.status } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || response?.data?.message, statusCode: response.status } });
        }
    } catch (error) {
        if (error.code === "ERR_NETWORK") {
            yield put({ type: ERROR_CODE, payload: { message: "Network error or content too large", statusCode: 400 } });
        } else {
            const errorMessage = error?.response?.data?.detail || error?.response?.data?.message || error?.message ;
            const statusCode = error?.response?.status || error?.status;
            yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
        }
    }
}
















function* UserSaga() {

    yield takeEvery(SIGN_IN_SAGA, handleSignIn);
    yield takeEvery(FORGOT_PASSWORD_API_CALL, handleForgotPassword);
    yield takeEvery(FORGOT_USER_API_CALL, handleForgotUser);
    yield takeEvery(RESET_PAGE_API_CALL, handleResetPage);
    yield takeEvery(RESET_PASSWORD_API_CALL, handleResetPassword);
    yield takeEvery(CREATE_ACCOUNT_API_CALL, handleCreateAccount);
    yield takeEvery(SIGN_UP_VERIFICATION_SAGA, handleVerification);
    yield takeEvery(OTP_SEND_SAGA, handleSendOtp);
    yield takeEvery(OTP_VERIFY_SAGA, handleOtpVerified);
    yield takeEvery(ACCOUNT_REGISTER_SAGA, handleAccountRegister);
    yield takeEvery(GET_USER_INFO_SAGA, handleGetUserInfo)
    yield takeEvery(GET_ACTIVITIES_SAGA, handleGetActivities);





}
export default UserSaga;