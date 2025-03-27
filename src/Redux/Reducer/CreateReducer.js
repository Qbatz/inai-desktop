import { CREATE_ACCOUNT_RESPONSE } from "../../Utils/Constant";



export const initialState = {
   Message:'',
 
 }
 
 const CreateReducer = (state = initialState, action) => {
console.log('action',action,state);

    switch (action.type) {

       case  CREATE_ACCOUNT_RESPONSE:
          return { ...state,  Message: action.payload.response
          }
 
          default:
             return state;
    }
 
    
 }
 export default  CreateReducer;