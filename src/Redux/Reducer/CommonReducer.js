import {
    ERROR_CODE,
    SUCCESS_CODE,
    RESET_CODE,
    GET_MASTER_REDUCER,
} from "../../Utils/Constant";

export const initialState = {

    code: 0,
    errorMessage: "",
    successCode: 0,
    successMessage: "",
    emailid: "",
    resetPassword: "",
    IsVisible: 0,
    country: [],
    titles: [],

}


const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_CODE:
            return { ...state, code: action.payload.statusCode, errorMessage: action.payload.message }
        case SUCCESS_CODE: {
            const data = action.payload.response?.data || {};
            return {
                ...state,
                successCode: action.payload.statusCode || 0,
                successMessage: action.payload.message || '',
                IsVisible: action.payload.IsVisible || 0,
                emailid: data.email || '',
                resetPassword: data.resetPassword || '',
                resetUser: data.resetUser || '',
                resetpage: data.message || '',
                resetverify: data.message || '',
            }
        }


        case RESET_CODE:
            return { ...state, successCode: 0, code: 0, errorMessage: '', successMessage: "", IsVisible: 0 }
        case GET_MASTER_REDUCER:
            return { ...state, country: action.payload.response.country, titles: action.payload.response.titles }
        default:
            return state;
    }


}
export default CommonReducer;