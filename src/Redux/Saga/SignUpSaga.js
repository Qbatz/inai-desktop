import { takeEvery, call, put } from "redux-saga/effects";
import { Sigup } from "../Action/CreateAction";
import { SIGN_UP_REDUCER, SIGN_UP_SAGA ,ERROR_CODE} from "../../Utils/Constant";


function* handleSignUp(action) {
    const response = yield call(Sigup,action.payload)
    if (response.status === 200 || response.data.statusCode === 200) {
       yield put({ type:SIGN_UP_REDUCER, payload:{response: response.data}})
      
    }
    if (response.status === 201 || response.data.statusCode === 201) {
        yield put({ type:ERROR_CODE, payload:{message: response.data.message}})
     }

  
 }






function* SignUpSaga(){
    yield takeEvery(SIGN_UP_SAGA, handleSignUp)
 }
 export default SignUpSaga;