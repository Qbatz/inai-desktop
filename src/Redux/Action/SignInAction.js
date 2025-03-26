import axios from "axios";



export async function signIn() {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/login`, {
   
  })
}
