// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from './Core'
import { Image } from 'react-native'
import store from '../Store'
import { urlConfig } from '../Config/urlConfig'
import urljoin from 'url-join'

export default class AcTagHandler extends Ubb.RecursiveTagHandler {
    get supportedTagNames(): RegExp {
        return /ac\d{2}/i
    }

    getTagMode(tagData: Ubb.UbbTagData): Ubb.UbbTagMode {
        return Ubb.UbbTagMode.Empty
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

        const reg = /ac/g
        const tagName = tagData.tagName
        const acId = tagName.replace(reg, "")
        const url = `/static/images/ac/${acId}.png`
        const baseUrl = urlConfig[store.getState().user.netWorkType].staticImage

        return <Image source={{ uri: urljoin(baseUrl, url) }}></Image>
    }
}