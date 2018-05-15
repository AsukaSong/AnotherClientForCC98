﻿// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react'
import * as Ubb from './Core'
import { Text } from 'react-native'

/**
 * 处理 [u] 标签的处理器。
 */
export class UTagHandler extends Ubb.RecursiveTagHandler {
	get supportedTagNames(): string {
		return 'u'
	}

	execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        return <Text style={{ textDecorationLine: 'underline' }} >{innerContent}</Text>
	}
}