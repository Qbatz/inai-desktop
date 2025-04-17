import { GET_USER_INFO_REDUCER } from "../../Utils/Constant";

export const initialState = {

    userDetails: []
}

const UserReducer = (state = initialState, action) => {
  
    switch (action.type) {

        case GET_USER_INFO_REDUCER:
            return { ...state, userDetails: action.payload.users };

            default:
            return state;
    }


}
export default UserReducer;