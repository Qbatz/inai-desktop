import AxiosConfig from "../../WebService/AxiosConfig"



export async function GetPort() {
    return await AxiosConfig.get('/ports')
  }
  


  