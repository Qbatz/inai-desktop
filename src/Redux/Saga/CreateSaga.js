import { takeEvery, call, put } from "redux-saga/effects";
import { CreateAction } from "../Action/CreateAction";
import { CREATE_ACCOUNT_API_CALL, ERROR_CODE, SUCCESS_CODE } from "../../Utils/Constant";


function* handleCreateAccount(action) {

   

    try {
        const response = yield call(CreateAction, action.payload);
       


        if (response?.success || response?.status === 200) {
            
            yield put({ type: SUCCESS_CODE, payload: { response } });
        }

        else if (response?.status === 400) {
         
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Invalid request" } });
        }

        else {
           
            yield put({ type: ERROR_CODE, payload: { message: response?.message || "Something went wrong" } });
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
    
        yield put({ type: ERROR_CODE, payload: { message: errorMessage } });
    }
}



function* CreateAccountSaga() {
    yield takeEvery(CREATE_ACCOUNT_API_CALL, handleCreateAccount);
}

export default CreateAccountSaga;
