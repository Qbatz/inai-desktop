
import { GET_PORT_REDUCER, GET_PAYMENT_TERM_REDUCER, GET_DELIVERY_TERM_REDUCER } from "../../Utils/Constant";


export const initialState = {
    portList: [],
    paymentTermList: [],
    deliveryTermList: [],


}

const InvoiceReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_PORT_REDUCER:
            return { ...state, portList: action.payload.response }
        case GET_PAYMENT_TERM_REDUCER:
            return { ...state, paymentTermList: action.payload.response }
        case GET_DELIVERY_TERM_REDUCER:
            return { ...state, deliveryTermList: action.payload.response }

        default:
            return state;
    }


}
export default InvoiceReducer;