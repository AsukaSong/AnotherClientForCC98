// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as Ubb from './Core'
import { NoUbbTagHandler } from './NoUbbTagHandler'
import { BTagHandler } from './BTagHandler'
import { ImageTagHandler } from './ImageTagHandler'
import { ITagHandler } from './ITagHandler'
import { SizeTagHandler } from './SizeTagHandler'
import { QuoteTagHandler } from './QuoteTagHandler'
import { ColorTagHandler } from './ColorTagHandler'
// import { UrlTagHandler } from './URLTagHandler'
import { UTagHandler } from './UTagHandler'
import { DelTagHandler } from './DelTagHandler'
import { FontTagHandler } from './FontTagHandler'
import { UploadTagHandler } from './UploadTagHandler'
import EmTagHandler from './EmTagHandler'
import AcTagHandler from './AcTagHandler'
import MahjongTagHandler from './MahjongTagHandler'
import { UnHandleTagHandler } from './UnHandleTagHandler'
// import UrlTextHandler2 from './UrlTextHandler2'

/**
 * 创建一个具有所有功能的默认引擎。
 */
export function createEngine(): Ubb.UbbCodeEngine {

	const engine = new Ubb.UbbCodeEngine()

	// 在此处添加引擎所支持的所有标签处理器
	engine.handlers.register(BTagHandler)
	engine.handlers.register(ImageTagHandler)
	engine.handlers.register(ITagHandler)
	engine.handlers.register(SizeTagHandler)
	engine.handlers.register(QuoteTagHandler)
	engine.handlers.register(ColorTagHandler)
	// // engine.handlers.register(UrlTagHandler)
	// engine.handlers.register(UTagHandler)
	// engine.handlers.register(DelTagHandler)
	// engine.handlers.register(FontTagHandler)
	// engine.handlers.register(UploadTagHandler)
	engine.handlers.register(NoUbbTagHandler)

	// 以下是未命名标签处理程序，注意未命名标签处理程序的命中和注册顺序有关
	engine.handlers.register(EmTagHandler)
	engine.handlers.register(AcTagHandler)
	engine.handlers.register(MahjongTagHandler)
	engine.handlers.register(UnHandleTagHandler)


	// 以下是文字处理程序，注意文字的处理顺序完全取决于处理程序，请注意控制处理程序的顺序
    // engine.handlers.registerText(UrlTextHandler2)

	return engine
}

// 重新导出核心功能
export * from './Core'