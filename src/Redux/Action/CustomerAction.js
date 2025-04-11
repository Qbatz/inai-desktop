import AxiosConfig from "../../WebService/AxiosConfig"



export async function CreateCustomer(basic) {
    return await AxiosConfig.post('/usr/client',basic,{
     data: basic
    })
  }
  

  export async function EditCustomer(edit) {
    return await AxiosConfig.patch(`/usr/client/${edit.clientId}`,edit,{
     data: edit
    })
  }
  
  


  export async function DeleteCustomer(del) {
    return await AxiosConfig.delete(`/usr/client/${del}`);
   
      }


//   export async function GetCustomerList(basic) {
//     return await AxiosConfig.get('/usr/client',basic,{
//     data: basic
//    })
//  }



 export async function GetCustomerDetails(customerId) {
  return await AxiosConfig.get(`/usr/client/${customerId}`); 
}



export async function GetCustomerList(basic) {

  let queryParams = '';

    if (basic.startDate && basic.endDate) {
    queryParams = new URLSearchParams({
          startDate: basic.startDate || '',
      endDate: basic.endDate || ''
    }).toString();
  } else if (basic.searchKeyword) {
      queryParams = new URLSearchParams({
      searchKeyword: basic.searchKeyword || ''
    }).toString();
  }

  if (!basic.startDate && !basic.endDate && !basic.searchKeyword) {
    return await AxiosConfig.get('/usr/client');
  }


  return await AxiosConfig.get(`/usr/client?${queryParams}`);
}