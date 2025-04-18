import { takeEvery, call, put } from "redux-saga/effects";
import {
    GET_MASTER_REDUCER,
    GET_MASTER_SAGA,
    ERROR_CODE,


} from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { Master } from "../Action/SettingsAction";





function* handleMaster() {
    try {
        const response = yield call(Master)
        if (response.status === 200) {
            yield put({ type: GET_MASTER_REDUCER, payload: { response: response.data } });


        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }


    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}




function* SettingsSaga() {
    yield takeEvery(GET_MASTER_SAGA, handleMaster)




}
export default SettingsSaga;