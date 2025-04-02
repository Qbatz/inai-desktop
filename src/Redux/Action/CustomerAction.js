import AxiosConfig from "../../WebService/AxiosConfig"



export async function CreateCustomer(basic) {
    return await AxiosConfig.post('/usr/client',basic,{
     data: basic
    })
  }
  

  export async function EditCustomer(edit) {
    return await AxiosConfig.patch('/usr/client/vendorUniqueId',edit,{
     data: edit
    })
  }
  
  


  export async function DeleteCustomer(del) {
    return await AxiosConfig.delete(`/usr/client/${del}`);
   
      }


  export async function GetCustomerList(basic) {
    return await AxiosConfig.get('/usr/client',basic,{
    data: basic
   })
 }
 export async function GetCustomerDetails(customerId) {
  return await AxiosConfig.get(`/usr/client/${customerId}`); 
}