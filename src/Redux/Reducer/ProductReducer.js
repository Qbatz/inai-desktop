
import { GET_PRODUCT_REDUCER ,GET_PARTICULAR_PRODUCT_REDUCER,GET_CATEGORY_REDUCER,GET_SUB_CATEGORY_REDUCER,GET_BRAND_REDUCER} from "../../Utils/Constant";


export const initialState = {
    productList: [],
    categoryList: [],
    subCategoryList: [],
    brandList: [],
    particularProductList : [],
}

const ProductReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_PRODUCT_REDUCER:
            return { ...state, productList: action.payload.response }
            case GET_CATEGORY_REDUCER:
                return { ...state,categoryList: action.payload.response }
                case GET_SUB_CATEGORY_REDUCER :
                    return {...state, subCategoryList: action.payload.response}
                    case GET_BRAND_REDUCER: 
                    return { ...state, brandList: action.payload.response }
                    case GET_PARTICULAR_PRODUCT_REDUCER : 
                    return { ...state, particularProductList: action.payload.response }
        default:
            return state;
    }


}
export default ProductReducer;