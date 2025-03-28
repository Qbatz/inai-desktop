import { SIGN_IN_REDUCER, LOG_OUT } from "../../Utils/Constant";

export const initialState = {
   
 token: '',
 isLoggedIn: false,
 
 }
 
 const SignInReducer = (state = initialState, action) => {

    switch (action.type) {

       case SIGN_IN_REDUCER:
          return { ...state, token : action.payload.token, isLoggedIn: true  }
 
          case LOG_OUT:
          return { ...state,  isLoggedIn: false  }
 
          default:
             return state;
    }
 
    
 }
 export default SignInReducer;