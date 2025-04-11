
import AxiosConfig from "../../WebService/AxiosConfig";

export async function AddBasicInfoVendor(basic) {
  return await AxiosConfig.post('/usr/vendor/addBasicInfo',basic,{
   data: basic
  })
}


export async function AddAddressInfoVendor(address) {
  return await AxiosConfig.post('/usr/vendor/addAddressInfo',address,{
   data: address
  })
}

export async function AddBankInfoVendor(bank) {
  return await AxiosConfig.post('/usr/vendor/addBankDetails',bank,{
   data: bank
  })
}



export async function AddVendor(bank) {
  return await AxiosConfig.post('/usr/vendor',bank,{
   data: bank
  })
}


export async function EditVendor(bank) {
   return await AxiosConfig.patch(`/usr/vendor/${bank.vendor_id}`,bank,{
   data: bank
  })
}


export async function DeleteVendor(del) {
  return await AxiosConfig.delete(`/usr/vendor/${del}`);
}


export async function ParticularVendor(vendorId) {
    return await AxiosConfig.get(`/usr/vendor/${vendorId}`); 
}



export async function VendorAction(vendor) {

  let queryParams = '';

    if (vendor.startDate && vendor.endDate) {
    queryParams = new URLSearchParams({
          startDate: vendor.startDate || '',
      endDate: vendor.endDate || ''
    }).toString();
  } else if (vendor.searchKeyword) {
      queryParams = new URLSearchParams({
      searchKeyword: vendor.searchKeyword || ''
    }).toString();
  }

  if (!vendor.startDate && !vendor.endDate && !vendor.searchKeyword) {
    return await AxiosConfig.get('/usr/vendor');
  }


  return await AxiosConfig.get(`/usr/vendor?${queryParams}`);
}

