import axios from "axios";



export async function CreateAction() {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/create-account`, {
   
  })
}

export async function Sigup() {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/Sign-up`, {
   
  })
}