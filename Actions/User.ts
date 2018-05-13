import * as ActionTypes from '../ActionTypes'
import createAction from './ActionCreator'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import { netWorkType } from '../Config/netWorkType'

export const logOn = createAction(ActionTypes.LOG_ON)
export const logOff = createAction(ActionTypes.LOG_OFF)

export const updateUserInfo = createAction(ActionTypes.USER_INFO_UPDATE, (userInfo: UserInfo) => ({
    type: ActionTypes.USER_INFO_UPDATE,
    payload: {
        userInfo
    }
}))

export const init = createAction(ActionTypes.INIT)

export const changeTitle = createAction(ActionTypes.CHANGE_TITLE, (title: string) => ({
    type: ActionTypes.CHANGE_TITLE,
    payload: {
        title
    }
}))

export const changeNetworkType = createAction(ActionTypes.CHANGE_NETWORK_TYPE, (type: netWorkType) => ({
    type: ActionTypes.CHANGE_NETWORK_TYPE,
    payload: {
        type
    }
}))
