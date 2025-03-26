 import { VENDOR_REDUCER } from "../../Utils/Constant";
 
 
 
 export const initialState = {
    
  
  
  }
  
  const VendorReducer = (state = initialState, action) => {
 
     switch (action.type) {
 
        case VENDOR_REDUCER:
           return { ...state, }
  
           default:
              return state;
     }
  
     
  }
  export default VendorReducer;