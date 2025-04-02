
import { GET_CUSTOMER_LIST_REDUCER, GET_CUSTOMER_DETAILS_REDUCER, CUSTOMER_ID_REDUCER } from "../../Utils/Constant";


export const initialState = {
    customerId: '',
    customerList: [],
    customerDetails: [],
    ParticularCustomerList: []
}

const CustomerReducer = (state = initialState, action) => {
    console.log("Dispatched Action:", action);

    switch (action.type) {
        case GET_CUSTOMER_LIST_REDUCER:

            return { ...state, customerList: action.payload.customers }

        case CUSTOMER_ID_REDUCER:
            return { ...state, customerId: action.payload.customerId }


        case GET_CUSTOMER_DETAILS_REDUCER:

            console.log("Updating ParticularCustomerList:", action.payload.customers);
            return { ...state, ParticularCustomerList: action.payload.customers };





        default:
            return state;
    }


}
export default CustomerReducer;