import AxiosConfig from "../../WebService/AxiosConfig"



export async function Master() {
    return await AxiosConfig.get('/common/master',)
  }
  


  
export async function GetCategory() {
  return await AxiosConfig.get('/product/category')
}