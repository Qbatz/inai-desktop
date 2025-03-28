import {SIGN_UP_VERIFICATION_REDUCER} from '../../Utils/Constant'

export const initialState = {
   
   is_verified: null,
 
 }
 
 const SignUpReducer = (state = initialState, action) => {

    switch (action.type) {

       case SIGN_UP_VERIFICATION_REDUCER:
          return { ...state,  is_verified : action.payload.is_verified}
 
         
 
          default:
             return state;
    }
 
    
 }
 export default SignUpReducer;