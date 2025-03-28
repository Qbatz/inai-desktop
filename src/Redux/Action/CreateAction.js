import AxiosConfig from "../../WebService/AxiosConfig.js";




 
export async function CreateAction(Account) {
 
  
  return await AxiosConfig.post('/user/email_verify', Account, {
    data : Account
  })
}



export async function Verification(signup) {
  return await AxiosConfig.post('/user/email-verify-confirm/', signup,{
   data:signup
  })
}


export async function OtpSend(send) {
  return await AxiosConfig.post('/user/reg-send-otp/', send,{
   data:send
})
}