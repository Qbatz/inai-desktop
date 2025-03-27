import { takeEvery, call, put } from "redux-saga/effects";
import { CreateAction } from "../Action/CreateAction";
import { CREATE_ACCOUNT_API_CALL, ERROR_CODE, SUCCESS_CODE } from "../../Utils/Constant";


function* handleCreateAccount(action) {

    console.log('Action Received:', action);

    const response = yield call(CreateAction, action.payload);
    console.log("API Response:", response);

    if (response.status === 200 || response.data?.statusCode === 200) {
        console.log("Success Message from API:", response.data?.message);
        yield put({ type: SUCCESS_CODE, payload: { message: response.data?.message } });
    }
    else if (response.status === 400 || response.data?.statusCode === 400) {
        console.log('Error Response from Backend:', response.data?.message);
        yield put({ type: ERROR_CODE, payload: { message: response.data?.message } });
    }
}


function* CreateAccountSaga() {
    yield takeEvery(CREATE_ACCOUNT_API_CALL, handleCreateAccount);
}

export default CreateAccountSaga;
