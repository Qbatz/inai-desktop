
import { GET_PRODUCT_REDUCER } from "../../Utils/Constant";


export const initialState = {
    productList: [],
}

const ProductReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_PRODUCT_REDUCER:
            return { ...state, productList: action.payload.response }

        default:
            return state;
    }


}
export default ProductReducer;