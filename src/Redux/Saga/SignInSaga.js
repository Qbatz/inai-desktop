import { takeEvery, call, put } from "redux-saga/effects";
import { signIn } from "../Action/SIgnInAction";
import { SIGN_IN_REDUCER, SIGN_IN_SAGA ,ERROR_CODE} from "../../Utils/Constant";


function* handleSignIn(action) {
    const response = yield call(signIn,action.payload)
    if (response.status === 200 || response.data.statusCode === 200) {
       yield put({ type:SIGN_IN_REDUCER, payload:{response: response.data}})
      
    }
    if (response.status === 201 || response.data.statusCode === 201) {
        yield put({ type:ERROR_CODE, payload:{message: response.data.message}})
     }

  
 }






function* SignInSaga(){
    yield takeEvery(SIGN_IN_SAGA, handleSignIn)
 }
 export default SignInSaga;