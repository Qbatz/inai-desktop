import { GET_CUSTOMER_LIST_REDUCER, } from "../../Utils/Constant";


export const initialState = {
    customerList: [],
    customerDetails: []
}

const CustomerReducer = (state = initialState, action) => {
    console.log("Dispatched Action:", action);
    
    switch (action.type) {
        case GET_CUSTOMER_LIST_REDUCER:
            console.log("Updating customerList:", action.payload.customers);
            return { ...state, customerList: action.payload.customers }

       
        default:
            return state;
    }


}
export default CustomerReducer;