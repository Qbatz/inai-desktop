import axios from "axios";



export async function VendorAction() {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/vendor`, {
   
  })
}