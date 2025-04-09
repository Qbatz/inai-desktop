import { STORE_ADDRESS_DATA } from "../../Utils/Constant";
import AxiosConfig from "../../WebService/AxiosConfig";


export async function VendorAction(vendor) {
  return await AxiosConfig.get('/usr/vendor',vendor, {
   data:vendor
  })
}


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



