
import { GET_CUSTOMER_LIST_REDUCER, GET_CUSTOMER_DETAILS_REDUCER, CUSTOMER_ID_REDUCER } from "../../Utils/Constant";


export const initialState = {
    customerId: '',
    customerList: [],
    customerDetails: {}
}

const CustomerReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_CUSTOMER_LIST_REDUCER:

            return { ...state, customerList: action.payload.customers }

        case CUSTOMER_ID_REDUCER:
            return { ...state, customerId: action.payload.customerId }


        case GET_CUSTOMER_DETAILS_REDUCER:

            return { ...state, customerDetails: action.payload.customers};




       
        default:
            return state;
    }


}
export default CustomerReducer;