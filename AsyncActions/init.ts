import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import * as Actions from '../Actions/User'
import { RootState } from '../Store'
import * as storage from '../Utility/StorageUtility'

export const init: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch, getState) => {
    try {
        let userInfo = await storage.getStorage('userInfo')
        if(userInfo) {
            dispatch(Actions.logOn())
            dispatch(Actions.updateUserInfo(userInfo))
            return dispatch(Actions.init())
        } else {
            return dispatch(Actions.init())
        }
    } catch (e) {
        console.error(e)
    }
}
