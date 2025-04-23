import AxiosConfig from "../../WebService/AxiosConfig";


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
   
    return await AxiosConfig.post('/user/reset-password', resetpassword, {
      data: resetpassword
    })
  }

  export async function CreateAction(Account) {
 
  
    return await AxiosConfig.post('/user/email_verify', Account, {
      data : Account
    })
  }
  
  
  
  export async function Verification(signup) {
    return await AxiosConfig.post('/user/email-verify-confirm', signup,{
     data:signup
    })
  }
  
  
  export async function OtpSend(send) {
    return await AxiosConfig.post('/user/reg-send-otp', send,{
     data:send
  })
  }
  
  
  
  export async function OtpVerified(send) {
    return await AxiosConfig.post('/user/reg-verify-otp', send,{
     data:send
  })
  }
  
  export async function AccountRegister(send) {
    return await AxiosConfig.post('/user/company-registration', send,{
     data:send
  })
  }
  

export async function GetUserInfo(payload) {
    return await AxiosConfig.get(`/user/info`, { params: payload }); 
}


export async function GetActivities() {
  return await AxiosConfig.get('/user/activities')
}
