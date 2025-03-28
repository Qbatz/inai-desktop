import AxiosConfig from "../../WebService/AxiosConfig.js";


export async function signIn(signIn) {
  return await AxiosConfig.post(`/auth/token`, signIn, {
    data: signIn
  })
}


export async function ForgotAction(forgot) {
  return await AxiosConfig.post('/user/forgot-password', forgot, {
    data: forgot
  })
}

export async function ForgotPasswordAction(password) {
  return await AxiosConfig.post('/user/forgot-clientid', password, {
    data: password
  })
}


export async function ReSetPageAction(reset) {
  return await AxiosConfig.post('user/reset-password-valid-check', reset, {
    data: reset
  })
}

export async function ReSetPassword(resetpassword) {
  console.log("/user/reset-password");
  
  return await AxiosConfig.post('/user/reset-password', resetpassword, {
    data: resetpassword
  })
}