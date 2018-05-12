import * as Redux from 'redux'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import * as storage from '../Utility/StorageUtility'
import { RootAction } from '../Store'
import * as ActionTypes from '../ActionTypes'

export class UserStore {
    userInfo = {} as UserInfo
    isLogOn = false
    isLoading = true
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
        default: 
            return state
    }
}
