
import Cookies from 'universal-cookie';

export function refreshToken(response) {
    if (response.data && response.data.refresh_token) {
       const refreshTokenGet = response.data.refresh_token
              const cookies = new Cookies()
       cookies.set('inai-token', refreshTokenGet, { path: '/' });
    } else if (response.status === 206) {
       const message = response.status
       const cookies = new Cookies()
       cookies.set('access-denied-inai', message, { path: '/' });
 
    }
 
 }