import { takeEvery, call, put } from "redux-saga/effects";
import { GET_MASTER_REDUCER,GET_MASTER_SAGA,ERROR_CODE} from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { toast } from 'react-toastify';
import { Master } from "../Action/SettingsAction";


// export const toastStyle = {
//     backgroundColor: "#28C76F",
//     color: "#F8F9FA",
//     width: "100%",
//     borderRadius: "12px",
//     height: "40px",
//     fontFamily: "Gilroy",
//     fontWeight: 600,
//     fontSize: "14px",
//     textAlign: "start",
//     display: "flex",
//     alignItems: "center",
//     padding: "12px 20px",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
// };


function* handleMaster() {
    try {
        const response = yield call(Master)
        console.log("master", response)
        if (response.status === 200 || response.data.statusCode === 200) {
            yield put({ type: GET_MASTER_REDUCER , payload:{ response: response.data}});

           
        }
        else if (response.status === 201 || response.data.statusCode === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
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



function* SettingsSaga() {
    yield takeEvery(GET_MASTER_SAGA, handleMaster)
   






}
export default SettingsSaga;