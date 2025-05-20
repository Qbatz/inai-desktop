import { takeEvery, call, put } from "redux-saga/effects";
import {
    ERROR_CODE,
    GET_PORT_REDUCER,
    GET_PORT_SAGA,
    GET_PAYMENT_TERM_REDUCER,
    GET_PAYMENT_TERM_SAGA,
    GET_DELIVERY_TERM_REDUCER,
    GET_DELIVERY_TERM_SAGA,
    GET_ALL_INVOICE_SAGA,
    GET_ALL_INVOICE_REDUCER,
    SUCCESS_CODE,
    GET_SINGLE_INVOICE_REDUCER,
    GET_SINGLE_INVOICE_SAGA



} from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { GetPort, GetPaymentTerm, GetDeliveryTerm, GetAllInvoiceList, GetInvoiceDetails } from "../Action/InvoiceAction";






function* handleGetPort() {
    try {
        const response = yield call(GetPort)
        if (response.status === 200) {
            yield put({ type: GET_PORT_REDUCER, payload: { response: response.data } });


        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
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

function* handleGetPaymentTerm() {
    try {
        const response = yield call(GetPaymentTerm)
        if (response.status === 200) {
            yield put({ type: GET_PAYMENT_TERM_REDUCER, payload: { response: response.data } });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
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

function* handleGetDeliveryTerm() {
    try {
        const response = yield call(GetDeliveryTerm)
        if (response.status === 200) {
            yield put({ type: GET_DELIVERY_TERM_REDUCER, payload: { response: response.data } });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
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


function* handleGetAllInvoiceList(action) {

    try {
        const response = yield call(GetAllInvoiceList, action.payload)
        if (response.status === 200) {


            yield put({ type: GET_ALL_INVOICE_REDUCER, payload: { invoice: response.data } });

            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
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



function* handleGetSingleInvoiceList(action) {

    try {
        const response = yield call(GetInvoiceDetails, action.payload)
        if (response.status === 200) {

            yield put({ type: GET_SINGLE_INVOICE_REDUCER, payload: { invoice: response.data } });
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
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












function* InvoiceSaga() {
    yield takeEvery(GET_PORT_SAGA, handleGetPort)
    yield takeEvery(GET_PAYMENT_TERM_SAGA, handleGetPaymentTerm)
    yield takeEvery(GET_DELIVERY_TERM_SAGA, handleGetDeliveryTerm)
    yield takeEvery(GET_ALL_INVOICE_SAGA, handleGetAllInvoiceList)

    yield takeEvery(GET_SINGLE_INVOICE_SAGA, handleGetSingleInvoiceList)


}
export default InvoiceSaga;