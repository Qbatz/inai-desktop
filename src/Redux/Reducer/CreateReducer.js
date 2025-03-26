import { CREATE_ACCOUNT_REDUCER } from "../../Utils/Constant";



export const initialState = {
   
 
 
 }
 
 const CreateReducer = (state = initialState, action) => {

    switch (action.type) {

       case  CREATE_ACCOUNT_REDUCER:
          return { ...state, }
 
          default:
             return state;
    }
 
    
 }
 export default  CreateReducer;