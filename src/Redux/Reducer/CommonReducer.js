import {
    ERROR_CODE,
    SUCCESS_CODE,
    RESET_CODE,
    GET_MASTER_REDUCER,
    EDIT_PARTICULAR_PRODUCT_REDUCER
} from "../../Utils/Constant";

export const initialState = {

    code: 0,
    errorMessage: "",
    successCode: 0,
    editStatusCode: 0,
    successMessage: "",
    isLoginSuccess: false,
    emailid: "",
    resetPassword: "",
    isVisible: 0,
    isTriggerMessage: 0,
    country: [],
    titles: [],
    isValidToken: 0,


}


const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_CODE:
            return { ...state, code: action.payload.statusCode, errorMessage: action.payload.message ,  isValidToken: action.payload.isValidToken}
        case SUCCESS_CODE: {
            const data = action.payload.response?.data || {};
            return {
                ...state,
                successCode: action.payload.statusCode || 0,
                successMessage: action.payload.message || '',
                isVisible: action.payload.isVisible || 0,
                isTriggerMessage: action.payload.isTriggerMessage || 0,
                emailid: data.email || '',
                resetPassword: data.resetPassword || '',
                resetUser: data.resetUser || '',
                resetpage: data.message || '',
                resetverify: data.message || '',
                isLoginSuccess: action.payload.isLoginSuccess
            }
        }


        case RESET_CODE:
            return { ...state, successCode: 0, code: 0, errorMessage: '', successMessage: "", isVisible: 0, isTriggerMessage: 0, editStatusCode: 0 }
        case GET_MASTER_REDUCER:
            return { ...state, country: action.payload.response.country, titles: action.payload.response.titles }
        case EDIT_PARTICULAR_PRODUCT_REDUCER:
            return { ...state, editStatusCode: action.payload.statusCode }
        default:
            return state;
    }


}
export default CommonReducer;