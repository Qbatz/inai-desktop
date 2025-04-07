import AxiosConfig from "../../WebService/AxiosConfig"



export async function Master() {
    return await AxiosConfig.get('/common/master',)
  }
  