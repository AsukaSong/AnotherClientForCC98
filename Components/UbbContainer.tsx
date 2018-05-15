// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from '../Ubb/UbbCodeExtension'
import { View, Text } from 'react-native'
import { UbbCodeContext } from '../Ubb/UbbCodeExtension'

/**
 * 定义 UBBContainer 组件需要使用的属性。
 */
export class UbbContainerProps {
	/**
	 * UBB 容器需要解析的 UBB 代码字符串。
	 */
	code: string;
	/**
	 * UBB 容器使用的 UBB 引擎。引擎可在多次解析时重复使用，从而实现对整个文档的跨容器状态维护（如对特定内容进行统一计数等）。
	 */
	engine?: Ubb.UbbCodeEngine;
	/**
	 * UBB 解析时使用的相关选项。
	 */
	options?: Ubb.UbbCodeOptions;
}

/**
 * 提供用于解析 UBB 的核心组件。
 */
export class UbbContainer extends React.Component<UbbContainerProps, {}> {

	render() {

		// 获取引擎对象，如果不使用引擎对象则创建一个默认的
		const engine = this.props.engine || Ubb.createEngine()
		engine.execText = (text: string, context: UbbCodeContext) => <Text style={{ fontSize: 17 }} >{text}</Text>
		// 获取选项，如果不设置选项则创建一个默认的
		const options = this.props.options || new Ubb.UbbCodeOptions()
        //code为一段UBB字符串
        let { code } = this.props

		const ubbHtml = engine.exec(code || '', options)
		
		console.log(ubbHtml)
        
		return <View>{ubbHtml}</View>
	}

}