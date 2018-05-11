import * as storage from './StorageUtility'
import urljoin from 'url-join'

export async function cFetch(url: string, init: RequestInit = { headers: {}}) {
    const baseURL = 'https://api-v2.cc98.org'
    let token = await storage.getStorage('accessToken') as string
    console.log(url)

    if(!token) {
        let requestBody = {
            'client_id': '42cb8d05-eb88-4e97-cfaa-08d5a073b73c',
            'client_secret': '21ddeeb8-1f50-4bf9-856e-df4a2b6912c9',
            'grant_type': 'password',
            'username': await storage.getStorage('username'),
            'password': await storage.getStorage('password'),
            'scope': "cc98-api openid offline_access"
        }

        let res = await fetch('https://openid.cc98.org/connect/token', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: Object.keys(requestBody).map(key => `${key}=${encodeURIComponent(requestBody[key])}`).join('&')
            })

        let data = await res.json()
        token = data.access_token
        storage.setStorage('accessToken', data.token_type + ' ' + token, data.expires_in * 1000)

    }
    
    return fetch(urljoin(baseURL, url), {...init, ...{
        headers: {
            ...init.headers,
            'Authorization': token
        }
    }})
}
