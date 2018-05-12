import * as ActionTypes from '../ActionTypes'
import createAction from './ActionCreator'
import { UserInfo } from '../TypeDefinitions/UserInfo'

export const logOn = createAction(ActionTypes.LOG_ON)
export const logOff = createAction(ActionTypes.LOG_OFF)

export const updateUserInfo = createAction(ActionTypes.USER_INFO_UPDATE, (userInfo: UserInfo) => ({
    type: ActionTypes.USER_INFO_UPDATE,
    payload: {
        userInfo
    }
}))

export const init = createAction(ActionTypes.INIT)