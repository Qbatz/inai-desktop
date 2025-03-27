import {
    ERROR_CODE,
    SUCCESS_CODE,
    RESET_CODE,
    SUCCESS_CODE_NO,
    ERROR_CODE_NO
  } from "../../Utils/Constant";

export const initialState = {

    code: 0,
    errorMessage: "",
    successCode: 0,
    successMessage: ""


}

const CommonReducer = (state = initialState, action) => {
console.log('state',state,action);

    switch (action.type) {
        case ERROR_CODE:
            return { ...state,code : ERROR_CODE_NO, errorMessage:action.payload.message }
            case SUCCESS_CODE:
                return { ...state, successCode: SUCCESS_CODE_NO , successMessage: action.payload.message}
                case RESET_CODE:
                    return { ...state, successCode: 0, errorMessage:'' , successMessage: "" }

        default:
            return state;
    }


}
export default CommonReducer;