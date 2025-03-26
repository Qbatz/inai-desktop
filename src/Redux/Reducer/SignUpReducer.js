import { SIGN_UP_REDUCER } from "../../Utils/Constant";



export const initialState = {
   
 
 
 }
 
 const SignUpReducer = (state = initialState, action) => {

    switch (action.type) {

       case  SIGN_UP_REDUCER:
          return { ...state, }
 
          default:
             return state;
    }
 
    
 }
 export default  SignUpReducer;