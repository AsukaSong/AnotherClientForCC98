// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from './Core'
import { Image, Text } from 'react-native'

//暂时完成 目前可以区分支持格式的图片和其他格式的文件 
//对于支持格式的图片，会根据第二个参数的值决定是否默认显示
//对于其他格式的文件，是否填写第二个参数没有影响（与原版98相同）
//与原版98不同之处之一是，现在upload标签不写参数也可以解析，但是这时不能区分图片与非图片

export class UploadTagHandler extends Ubb.TextTagHandler {
    innerHTML: JSX.Element

    get supportedTagNames(): string { return 'upload' }

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        
        const uploadUri = content
        const uploadType = tagData.value(0)
        let uploadValue
        if (tagData.parameterCount === 1) uploadValue = 0
        if (tagData.parameterCount === 2) uploadValue = parseInt(tagData.value(1))

        switch (uploadType) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "webp":
                return <Image source={{ uri: uploadUri }} />
            default:
                return <Text>点击下载文件</Text>
        }

    }
}