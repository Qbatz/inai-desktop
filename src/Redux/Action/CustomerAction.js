import AxiosConfig from "../../WebService/AxiosConfig"



export async function CreateCustomer(basic) {
    return await AxiosConfig.post('',basic,{
     data: basic
    })
  }
  


  export async function EditCustomer(basic) {
    return await AxiosConfig.post('',basic,{
     data: basic
    })
  }
  


  export async function DeleteCustomer(basic) {
    return await AxiosConfig.post('',basic,{
     data: basic
    })
  }


  export async function GetCustomerList(basic) {
     return await AxiosConfig.get('/usr/client',basic,{
     data: basic
    })
  }

  
  export async function GetCustomerDetails(customerId) {
    return await AxiosConfig.get(`/usr/client/${customerId}`); 
}




