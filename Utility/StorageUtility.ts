import { AsyncStorage } from 'react-native'

/**
 * 
 * @param key 索引
 * @param data 内容
 * @param expires 过期时间，ms，可选
 */
export async function setStorage(key: string, data: any, expires: number = undefined): Promise<void> {
    let value: string;
    if(typeof data === 'object') {
        value = `obj-${JSON.stringify(data)}`
    } else {
        value = `str-${data}`
    }
    await AsyncStorage.setItem(key, value)
    if(expires) {
        await AsyncStorage.setItem(`${key}_expires`, (Date.now() + expires).toString())
    }
}

/**
 * 
 * @param key 索引
 */
export async function getStorage(key: string): Promise<any> {
    console.log(key)
    let expires = await getItem(`${key}_expires`)
    if(expires && (parseInt(expires) < Date.now())) return undefined
    let data = await getItem(key)
    if(!data) return undefined
    if (data.indexOf('obj-') === 0) {
        data = data.slice(4);
        return JSON.parse(data);
    } else if (data.indexOf('str-') === 0) {
        return data.slice(4);
    }
}

export async function removeStorage(key: string): Promise<void> {
    await AsyncStorage.removeItem(key)
    await AsyncStorage.removeItem(`${key}_expires`)
}

/**
 * from https://github.com/facebook/react-native/issues/14101#issuecomment-345563563
 * @param key 
 */
async function getItem(TOKEN_KEY: string) {
    const resolvedPromisesArray = [
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(TOKEN_KEY)
    ]
    const token = await Promise.race(resolvedPromisesArray)
    return token
}
