import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

const storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})

/**
 * 
 * @param key 索引
 * @param data 内容
 * @param expires 过期时间，ms，可选
 * @param id 索引下的id，可选
 */
export async function setStorage(key: string, data: any, expires = null, id: string | number | null = null): Promise<void> {
    let t = storage.save({
        key,
        data,
        expires,
        id
    })

    await t;
}

/**
 * 
 * @param key 索引
 * @param id 索引下的id，可选
 */
export async function getStorage<T>(key: string, id: string | number | null = null): Promise<T> {
    try {
        let data = await storage.load({
            key,
        })
        
        return data as T

    } catch(e) {

    }
}

export async function removeStorage(key: string, id: string | number | null = null): Promise<void> {
    let t = storage.remove({ 
        key,
        id
    })

    await t
}
