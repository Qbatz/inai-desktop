import axios from "axios";
import AxiosConfig from "../../WebService/AxiosConfig.js";


export async function signIn() {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/login`, {
   
  })
}


export async function ForgotAction(forgot) {
  
  
  return await AxiosConfig.post('/user/forgot-password', forgot, {
    data : forgot
  })
}

export async function ForgotPasswordAction(password) {
 
  
  return await AxiosConfig.post('/user/forgot-clientid', password, {
    data : password
  })
}