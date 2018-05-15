// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from './Core'
import CustomImage from '../Components/Image'

export class ImageTagHandler extends Ubb.TextTagHandler {
    get supportedTagNames(): string { return 'img' }

    execCore(content: string, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        if(context.data.quoteDepth !== 0) return null
        return <CustomImage source={{ uri: content }} />
    }
}
