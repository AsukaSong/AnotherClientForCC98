﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from './Core'
import { Image } from 'react-native'
import store from '../Store'
import { urlConfig } from '../Config/urlConfig'
import urljoin from 'url-join'

export default class EmTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /em\d{2}/i
    }   //正则表达式，意为em+两位数字,i表示区分大小写

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const tagName = tagData.tagName
        const emoticonId = tagName.match(/\d{2}/).toString()
        const url = `/static/images/em/em${emoticonId}.gif`
        const baseUrl = urlConfig[store.getState().user.netWorkType].staticImage

        return <Image source={{ uri: urljoin(baseUrl, url) }}></Image>
    }
}