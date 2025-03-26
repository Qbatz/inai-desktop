import { SIGN_IN_REDUCER } from "../../Utils/Constant";



export const initialState = {
   
 
 
 }
 
 const SignInReducer = (state = initialState, action) => {

    switch (action.type) {

       case SIGN_IN_REDUCER:
          return { ...state, }
 
          default:
             return state;
    }
 
    
 }
 export default SignInReducer;