import { takeEvery, call, put } from "redux-saga/effects";
import { SUCCESS_CODE, ERROR_CODE, ADD_CUSTOMER_SAGA } from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { toast } from 'react-toastify';


function* handleCreateCustomer(action) {
    try {
        const response = yield call(VendorAction, action.payload)
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






}
export default CustomerSaga;