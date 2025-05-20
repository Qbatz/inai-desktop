

import { GET_PORT_REDUCER, GET_PAYMENT_TERM_REDUCER, GET_DELIVERY_TERM_REDUCER, GET_ALL_INVOICE_REDUCER, GET_SINGLE_INVOICE_REDUCER } from "../../Utils/Constant";





export const initialState = {
    portList: [],
    paymentTermList: [],
    deliveryTermList: [],
    invoiceList: [],
    particularInvoiceList : [],



}

const InvoiceReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_PORT_REDUCER:
            return { ...state, portList: action.payload.response }
        case GET_PAYMENT_TERM_REDUCER:
            return { ...state, paymentTermList: action.payload.response }
        case GET_DELIVERY_TERM_REDUCER:
            return { ...state, deliveryTermList: action.payload.response }
        case GET_ALL_INVOICE_REDUCER:
            return { ...state, invoiceList: action.payload.invoice, }

        case GET_SINGLE_INVOICE_REDUCER:
            return { ...state, particularInvoiceList: action.payload.invoice, }

        default:
            return state;
    }


}
export default InvoiceReducer;