 import {VENDOR_BASIC_INFO_REDUCER,VENDOR_ADDRESS_INFO_REDUCER, VENDOR_BANK_INFO_REDUCER ,CREATE_VENDOR_REDUCER,VENDOR_REDUCER} from "../../Utils/Constant";
 
 
 
 export const initialState = {
       vendorId: '',
       vendorList:[]
    }
  
  const VendorReducer = (state = initialState, action) => {
 
     switch (action.type) {
         case VENDOR_BASIC_INFO_REDUCER:
           return { ...state,  vendorId: action.payload.vendorId }

           case VENDOR_ADDRESS_INFO_REDUCER:
            return { ...state,  vendorId: action.payload.vendorId }

            case VENDOR_BANK_INFO_REDUCER:
               return { ...state,  vendorId: action.payload.vendorId }

               case CREATE_VENDOR_REDUCER:
                  return { ...state,  vendorId: action.payload.vendorId }

               case VENDOR_REDUCER : 
               return {...state, vendorList: action.payload.response}



             default:
              return state;
     }
  
     
  }
  export default VendorReducer;