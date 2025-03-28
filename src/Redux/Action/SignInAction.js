import AxiosConfig from "../../WebService/AxiosConfig.js";


export async function signIn(signIn) {
  return await AxiosConfig.post(`/auth/token`,signIn, {
   data:signIn
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