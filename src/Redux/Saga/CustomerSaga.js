import { takeEvery, call, put } from "redux-saga/effects";
import { SUCCESS_CODE, ERROR_CODE, ADD_CUSTOMER_SAGA, EDIT_CUSTOMER_SAGA,DELETE_CUSTOMER_SAGA } from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { toast } from 'react-toastify';
import { CreateCustomer, EditCustomer ,DeleteCustomer} from '../Action/CustomerAction'


function* handleCreateCustomer(action) {
    try {
        const response = yield call(CreateCustomer, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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


function* handleEditCustomer(action) {
    try {
        const response = yield call(EditCustomer, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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


function* handleDeleteCustomer(action) {
    try {
        const response = yield call(DeleteCustomer, action.payload)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message } })
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











function* CustomerSaga() {
    yield takeEvery(ADD_CUSTOMER_SAGA, handleCreateCustomer)
    yield takeEvery(EDIT_CUSTOMER_SAGA, handleEditCustomer)
    yield takeEvery(DELETE_CUSTOMER_SAGA,  handleDeleteCustomer)





}
export default CustomerSaga;