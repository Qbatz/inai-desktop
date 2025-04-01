import { takeEvery, call, put } from "redux-saga/effects";
import { signIn, ForgotAction, ForgotPasswordAction,ReSetPageAction, ReSetPassword } from "../Action/SignInAction";
import {
    SIGN_IN_REDUCER, SIGN_IN_SAGA, ERROR_CODE, FORGOT_PASSWORD_API_CALL,
    SUCCESS_CODE, FORGOT_USER_API_CALL,RESET_PAGE_API_CALL,RESET_PASSWORD_API_CALL
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
        const errorMessage = error?.response?.data?.detail;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}



function* handleForgotPassword(forgot) {
    try {
        const response = yield call(ForgotAction, forgot.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
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
    try {
        const response = yield call(ForgotPasswordAction, user.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong" } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
        yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
    }
}

function* handleResetPage(reset) {
    try {
        
        const response = yield call(ReSetPageAction, reset.payload);
        if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong" } });
        }
    } catch (error) {
                const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
        yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
    }
}

function* handleResetPassword(verify) {
    try {
                     const response = yield call(ReSetPassword, verify.payload);
               if (response?.success || response?.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }
        else {
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong" } });
        }
    } catch (error) {
             const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';

        yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
    }
}

function* SignInSaga() {
    yield takeEvery(SIGN_IN_SAGA, handleSignIn);
    yield takeEvery(FORGOT_PASSWORD_API_CALL, handleForgotPassword);
    yield takeEvery(FORGOT_USER_API_CALL, handleForgotUser);
    yield takeEvery(RESET_PAGE_API_CALL, handleResetPage);
    yield takeEvery(RESET_PASSWORD_API_CALL, handleResetPassword);
}

export default SignInSaga;