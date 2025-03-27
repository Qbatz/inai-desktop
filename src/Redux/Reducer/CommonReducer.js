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
    successMessage: "",
    email_ID :"",
    loginUser: "sujithy@s3remotica.com",
    resetPassword:""


}

const CommonReducer = (state = initialState, action) => {


    switch (action.type) {
        case ERROR_CODE:
          ;
            
            return { ...state,code : ERROR_CODE_NO, errorMessage:action.payload.message }
            case SUCCESS_CODE:
               
                
                return { ...state, successCode: SUCCESS_CODE_NO , successMessage: action.payload.message, email_ID : action.payload.response.data.email ,
                   resetPassword : action.payload.response.data.message
                }
                case RESET_CODE:
                    return { ...state, successCode: 0, errorMessage:'' , successMessage: "" ,email_ID : ""}

        default:
            return state;
    }


}
export default CommonReducer;