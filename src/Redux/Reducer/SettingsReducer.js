
import { GET_MASTER_REDUCER } from "../../Utils/Constant";


export const initialState = {
    countryCode:[],
    titles:[],
}

const SettingsReducer = (state = initialState, action) => {


    switch (action.type) {
        case GET_MASTER_REDUCER:

            return { ...state, countryCode: action.payload.response.country , titles:  action.payload.response.titles  }

       




       
        default:
            return state;
    }


}
export default SettingsReducer;