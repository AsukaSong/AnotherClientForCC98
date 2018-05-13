import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import * as Actions from '../Actions/User'
import { RootState } from '../Store'
import * as storage from '../Utility/StorageUtility'
import { refreshNewWorkType } from './refreshNetWorkType'

export const init: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch, getState) => {
    dispatch(refreshNewWorkType())
    try {
        let userInfo = await storage.getStorage('userInfo')
        if(userInfo) {
            dispatch(Actions.logOn())
             return dispatch(Actions.updateUserInfo(userInfo))
        } 
    } catch (e) {
        console.error(e)
    }
}
