import axios from 'axios'
import Cookies from 'universal-cookie';


const cookies = new Cookies();



const AxiosConfig = axios.create({
    baseURL: 'https://inaidevapi.s3remotica.com',
headers: {
  'Content-Type': 'application/json',

}
})




AxiosConfig.interceptors.request.use(
  (config) => {
      const token = cookies.get('inai-token');
     
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
      
  }
);
export default AxiosConfig;