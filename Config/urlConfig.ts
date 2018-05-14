export const urlConfig = {
    out: {
        API: 'https://api0.cc98.inzju.com',
        openid: 'https://openid0.cc98.inzju.com/connect/token',
        staticImage: 'http://cc98img0.inzju.com/static/',
        file: 'http://cc98file0.inzju.com'
    },
    in: {
        API: 'https://api-v2.cc98.org',
        openid: 'https://openid.cc98.org/connect/token',
        staticImage: 'https://www.cc98.org/static',
        file: 'http://file.cc98.org'
    }
} as {
    [key: string]: UrlConfig
}

interface UrlConfig {
    API: string
    openid: string
    staticImage: string
    file: string
}
