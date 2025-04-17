import AxiosConfig from "../../WebService/AxiosConfig";

export async function GetUserInfo(payload) {
    return await AxiosConfig.get(`/user/info`, { params: payload }); 
}
