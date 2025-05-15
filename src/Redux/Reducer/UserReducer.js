
import { OTP_SEND_REDUCER_REMOVE,REMOVE_ACCOUNT_REDUCER, GET_ACTIVITIES_REDUCER, GET_USER_INFO_REDUCER, SIGN_IN_REDUCER, LOG_OUT, LOG_IN, SIGN_UP_VERIFICATION_REDUCER, OTP_SEND_REDUCER, STORE_VERIFY_CODE, ACCOUNT_REGISTER_REDUCER } from "../../Utils/Constant";

export const initialState = {

    token: '',
    isLoggedIn: false,
    is_verified: null,
    otpValue: 0,
    verifyCode: '',
    isTrue: false,
    emailId: '',
    userDetails: [],
    activitiesList: [],
    otpSendSuccessCode: 0,
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case SIGN_IN_REDUCER:
            return { ...state, token: action.payload.token }

        case LOG_IN:
            return { ...state, isLoggedIn: true }

        case LOG_OUT:
            return { ...state, isLoggedIn: false }

        case SIGN_UP_VERIFICATION_REDUCER:
            return { ...state, is_verified: action.payload.is_verified, emailId: action.payload.emailId }

        case OTP_SEND_REDUCER:
            return { ...state, otpValue: action.payload.response.otp, otpSendSuccessCode: action.payload.statusCode }

        case OTP_SEND_REDUCER_REMOVE:
            return { ...state, otpSendSuccessCode: 0 }


        case STORE_VERIFY_CODE:
            return { ...state, verifyCode: action.payload || '' }

        case ACCOUNT_REGISTER_REDUCER:
            return { ...state, isTrue: true, is_verified: null }

        case REMOVE_ACCOUNT_REDUCER:
            return { ...state, isTrue: false, is_verified: null }

        case GET_USER_INFO_REDUCER:
            return { ...state, userDetails: action.payload.users };

        case GET_ACTIVITIES_REDUCER:
            return { ...state, activitiesList: action.payload.response }

        default:
            return state;
    }


}
export default UserReducer;