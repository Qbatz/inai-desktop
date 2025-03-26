import { takeEvery, call, put } from "redux-saga/effects";
import { CreateAction } from "../Action/CreateAction";
import { CREATE_ACCOUNT_REDUCER, CREATE_ACCOUNT_SAGA ,ERROR_CODE} from "../../Utils/Constant";


function* handleCreateAccount(action) {
    const response = yield call(CreateAction,action.payload)
    if (response.status === 200 || response.data.statusCode === 200) {
       yield put({ type:CREATE_ACCOUNT_REDUCER, payload:{response: response.data}})
      
    }
    if (response.status === 201 || response.data.statusCode === 201) {
        yield put({ type:ERROR_CODE, payload:{message: response.data.message}})
     }

  
 }






function* CreateAccountSaga(){
    yield takeEvery(CREATE_ACCOUNT_SAGA, handleCreateAccount)
 }
 export default CreateAccountSaga;