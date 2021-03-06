import * as Redux from 'redux'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import * as storage from '../Utility/StorageUtility'
import { RootAction } from '../Store'
import * as ActionTypes from '../ActionTypes'
import { netWorkType } from '../Config/netWorkType'

export class UserStore {
    userInfo = {} as UserInfo
    isLogOn = false
    isLoading = true
    title = 'CC98'
    netWorkType: netWorkType = 'in'
}

export default (state = new UserStore, action: RootAction): UserStore => {
    switch(action.type) {
        case ActionTypes.LOG_ON: 
            return { ...state, isLogOn: true }
        case ActionTypes.LOG_OFF: 
            return { ...state, isLogOn: false }
        case ActionTypes.USER_INFO_UPDATE: 
            return { ...state, userInfo: action.payload.userInfo }
        case ActionTypes.INIT: 
            return { ...state, isLoading: false}
        case ActionTypes.CHANGE_TITLE: 
            return { ...state, title: action.payload.title }
        case ActionTypes.CHANGE_NETWORK_TYPE: 
            return { ...state, netWorkType: action.payload.type }
        default: 
            return state
    }
}
