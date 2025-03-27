import axios from "axios";
import AxiosConfig from "../../WebService/AxiosConfig.js";


export async function signIn() {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/login`, {
   
  })
}


export async function ForgotAction(forgot) {
  return await AxiosConfig.post('/user/user/forgot-password', forgot, {
    data : forgot
  })
}