
import { GET_MASTER_REDUCER,GET_CATEGORY_REDUCER,GET_SUB_CATEGORY_REDUCER } from "../../Utils/Constant";


export const initialState = {
    countryCode:[],
    titles:[],
    categoryList: [],
    subCategoryList: [],
}

const SettingsReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_MASTER_REDUCER:
            return { ...state, countryCode: action.payload.response.country , titles:  action.payload.response.titles  }
       case GET_CATEGORY_REDUCER:
            return { ...state,categoryList: action.payload.response }
            case GET_SUB_CATEGORY_REDUCER :
                return {...state, subCategoryList: action.payload.response}
    
        default:
            return state;
    }


}
export default SettingsReducer;