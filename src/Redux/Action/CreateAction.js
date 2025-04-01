import AxiosConfig from "../../WebService/AxiosConfig.js";




 
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



