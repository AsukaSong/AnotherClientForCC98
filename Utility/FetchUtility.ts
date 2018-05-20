import * as storage from './StorageUtility'
import urljoin from 'url-join'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import store from '../Store'
import { urlConfig } from '../Config/urlConfig'

export async function cFetch(url: string, init: RequestInit = { headers: {}}) {
    const netWorkType = store.getState().user.netWorkType
    const baseURL = urlConfig[netWorkType].API
    
    let token = await storage.getStorage('accessToken') as string

    if(!token) {
        let requestBody = {
            'client_id': '42cb8d05-eb88-4e97-cfaa-08d5a073b73c',
            'client_secret': '21ddeeb8-1f50-4bf9-856e-df4a2b6912c9',
            'grant_type': 'password',
            'username': await storage.getStorage('username'),
            'password': await storage.getStorage('password'),
            'scope': "cc98-api openid offline_access"
        }

        const url = urlConfig[netWorkType].openid
        let res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: Object.keys(requestBody).map(key => `${key}=${encodeURIComponent(requestBody[key])}`).join('&')
        })

        let data = await res.json()
        console.log(data)
        token = data.access_token
        storage.setStorage('accessToken', data.token_type + ' ' + token, data.expires_in * 1000)

    }

    console.log(url)
    
    return fetch(urljoin(baseURL, url), {...init, ...{
        headers: {
            ...init.headers,
            'Authorization': token
        }
    }})
}

export async function getUsersInfo(keys: number[]): Promise<UserInfo[]> {
    try {
        // 缓存未命中的项，其值为对应的key，以便进一步通过api查询
        let infos: (UserInfo | number)[];
        infos = await Promise.all(keys.map(async item => (await storage.getStorage(`user_${item}`) || item)))

        // 批量查询未命中的项
        let querys = infos.filter(item => (typeof item === 'number'))
        let queryInfo: UserInfo[] = []
        if(querys.length !== 0){
            const url = `/user?id=${querys.join('&id=')}` 
            let res = await cFetch(url)
            queryInfo = await res.json();
        }

        queryInfo.map(item => storage.setStorage(`user_${item.id}`, item, 3600 * 1000))

        let userInfos: UserInfo[] = infos.map(item => {
            if(typeof item === 'number') {
                return queryInfo.filter(info => info.id === item)[0]
            } else {
                return item
            }
        })

        return userInfos;

    } catch(e) {
        console.error(e)
    }
}
