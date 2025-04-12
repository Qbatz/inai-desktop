import { takeEvery, call, put } from "redux-saga/effects";
import {
    GET_MASTER_REDUCER,
    GET_MASTER_SAGA,
    ERROR_CODE,
    GET_CATEGORY_REDUCER,
    GET_CATEGORY_SAGA,
    GET_SUB_CATEGORY_SAGA,
    GET_SUB_CATEGORY_REDUCER,
    GET_BRAND_REDUCER,
    GET_BRAND_SAGA

} from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { Master, GetCategory, GetSubCategory,GetBrand } from "../Action/SettingsAction";





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

function* handleCategory() {
    try {
        const response = yield call(GetCategory)
         if (response.status === 200) {
            yield put({ type: GET_CATEGORY_REDUCER, payload: { response: response.data } });

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


function* handleSubCategory(category) {
    try {
        const response = yield call(GetSubCategory, category.payload)
         if (response.status === 200) {
            yield put({ type: GET_SUB_CATEGORY_REDUCER, payload: { response: response.data } });

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





function* handleGetBrand() {
    try {
        const response = yield call(GetBrand)
         if (response.status === 200) {
            yield put({ type: GET_BRAND_REDUCER, payload: { response: response.data } });

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
    yield takeEvery(GET_CATEGORY_SAGA, handleCategory)
    yield takeEvery(GET_SUB_CATEGORY_SAGA, handleSubCategory)
    yield takeEvery(GET_BRAND_SAGA, handleGetBrand)



}
export default SettingsSaga;