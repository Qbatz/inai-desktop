
import { GET_PORT_REDUCER } from "../../Utils/Constant";


export const initialState = {
    PortList: []

}

const InvoiceReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_PORT_REDUCER:
            return { ...state, PortList: action.payload.response }

        default:
            return state;
    }


}
export default InvoiceReducer;