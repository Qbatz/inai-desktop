import { takeEvery, call, put } from "redux-saga/effects";
import {VendorAction} from "../Action/VendorAction";
import { VENDOR_REDUCER, VENDOR_SAGA ,ERROR_CODE} from "../../Utils/Constant";


function* handleVendorAction(action) {
    const response = yield call(VendorAction,action.payload)
    if (response.status === 200 || response.data.statusCode === 200) {
       yield put({ type:VENDOR_REDUCER, payload:{response: response.data}})
      
    }
    if (response.status === 201 || response.data.statusCode === 201) {
        yield put({ type:ERROR_CODE, payload:{message: response.data.message}})
     }

  
 }






function* VendorSaga(){
    yield takeEvery(VENDOR_SAGA, handleVendorAction)
 }
 export default VendorSaga;