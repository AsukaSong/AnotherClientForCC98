import { 
    applyMiddleware, 
    combineReducers, 
    compose, 
    createStore, 
    Dispatch } from 'redux'
import * as UserActions from './Actions/User'
import userReducer, { UserStore } from './Reducers/User'
import thunk from 'redux-thunk'

function values<T>(o: { [s: string]: T }): T[] {
    return Object.keys(o).map((key) => o[key])
}

/**
 * 全局store的类型定义
 */
export interface RootState {
    user: UserStore
}

function getReturn<T>( creator: (...args: any[]) => T): T { return }

const Actions = { ...UserActions }
const actionTypes = values(Actions).map(getReturn)

/**
 * 全部Action的类型定义
 */
export type RootAction = typeof actionTypes[number]

/**
 * 合并reducer
 */
const reducer = combineReducers<RootState>({
    user: userReducer,
})

export default createStore(reducer, applyMiddleware(thunk))
