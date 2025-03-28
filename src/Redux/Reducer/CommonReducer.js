import {
    ERROR_CODE,
    SUCCESS_CODE,
    RESET_CODE,
} from "../../Utils/Constant";

export const initialState = {

    code: 0,
    errorMessage: "",
    successCode: 0,
    successMessage: "",
      emailid: "",
    resetPassword: ""


}

const CommonReducer = (state = initialState, action) => {


    switch (action.type) {
        case ERROR_CODE:
            return { ...state, code: action.payload.statusCode, errorMessage: action.payload.message }
        case SUCCESS_CODE:


            return {
                ...state, successCode: action.payload.statusCode, successMessage: action.payload.message || '',   emailid: action.payload.response.data.email,
                resetPassword: action.payload.response.data.message, resetUser: action.payload.response.data.message
            }
        case RESET_CODE:
            return { ...state, successCode: 0, code: 0, errorMessage: '', successMessage: "",   emailid: "" }

        default:
            return state;
    }


}
export default CommonReducer;