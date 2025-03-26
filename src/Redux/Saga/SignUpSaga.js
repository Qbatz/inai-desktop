import { takeEvery, call, put } from "redux-saga/effects";
import { signUP } from "../Action/CreateAction";
import { SIGN_UP_REDUCER, SIGN_UP_SAGA ,ERROR_CODE} from "../../Utils/Constant";


function* handleSignUP(action) {
    const response = yield call(signUP,action.payload)
    if (response.status === 200 || response.data.statusCode === 200) {
       yield put({ type:SIGN_UP_REDUCER, payload:{response: response.data}})
      
    }
    if (response.status === 201 || response.data.statusCode === 201) {
        yield put({ type:ERROR_CODE, payload:{message: response.data.message}})
     }

  
 }






function* SignUPSaga(){
    yield takeEvery(SIGN_UP_SAGA, handleSignUP)
 }
 export default SignUPSaga;