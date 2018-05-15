// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from './Core'
import { View } from 'react-native'

/**
 * 处理 [quote] 标签的处理器。
 */
export class QuoteTagHandler extends Ubb.RecursiveTagHandler {

    get supportedTagNames(): string[] { return ['quote', 'quotex'] }
    
    // 重写exec方法
    exec(tagSegment, context: Ubb.UbbCodeContext) {

        // 记录引用深度
        context.data.quoteDepth ++

        const result = []

        for (const subSeg of tagSegment.subSegments) {
            result.push(context.engine.execSegment(subSeg, context))
        }

        context.data.quoteDepth --

        return this.execCore(result, tagSegment.tagData, context)
    }

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {

		// let style = {
        //     borderBottom: '1px solid rgb(204,204,204)',
        //     marginBottom: '10px',
        //     paddingBottom: '10px',
        //     display: 'flex',
        //     flexWrap: 'wrap',
        //     order: -1,
        //     overflowY: 'hidden',
        //     alignItems: 'baseline',
        //     width: '100%'
        // }

        // // 对最外层引用的处理
        // if(context.data.quoteDepth === 0) {
        //     // 隐藏下边框
        //     style.borderBottom = null
            
        //     // 最外层的样式
        //     let outStyle = {
        //         backgroundColor: '#F5FAFF',
        //         border: '1px solid rgb(204,204,204)',
        //         padding: '10px 19px 3px 17px',
        //         maxHeight: '800px',
        //         overflowY: 'auto'
        //     }

        //     return <View style={outStyle}><View style={style}>{innerContent}</View></View>
        // }
        
		return <View>{innerContent}</View>
	}
}
