import { SIGN_UP_VERIFICATION_REDUCER, OTP_SEND_REDUCER, STORE_VERIFY_CODE, ACCOUNT_REGISTER_REDUCER } from '../../Utils/Constant'

export const initialState = {

   is_verified: null,
   otpValue: 0,
   verifyCode: '',
   isTrue: false,
}

const SignUpReducer = (state = initialState, action) => {

   switch (action.type) {

      case SIGN_UP_VERIFICATION_REDUCER:
         return { ...state, is_verified: action.payload.is_verified }

      case OTP_SEND_REDUCER:
         return { ...state, otpValue: action.payload.response.otp }
      case STORE_VERIFY_CODE:
         return { ...state, verifyCode: action.payload || '' }

      case ACCOUNT_REGISTER_REDUCER:
         return { ...state, isTrue: true }

      default:
         return state;
   }


}
export default SignUpReducer;