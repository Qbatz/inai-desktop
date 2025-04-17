import { takeEvery, call, put } from "redux-saga/effects";
import { GET_USER_INFO_REDUCER, GET_USER_INFO_SAGA, ERROR_CODE, } from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { GetUserInfo } from '../Action/UserAction';


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
        const errorMessage =
            error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }
}


function* UserSaga() {

    yield takeEvery(GET_USER_INFO_SAGA, handleGetUserInfo)






}
export default UserSaga;