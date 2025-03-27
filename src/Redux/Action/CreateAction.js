import AxiosConfig from "../../WebService/AxiosConfig.js";




 
export async function CreateAction(Account) {
 
  
  return await AxiosConfig.post('/user/email_verify', Account, {
    data : Account
  })
}



export async function Sigup() {
  return await AxiosConfig.post('/Sign-up', {
   
  })
}