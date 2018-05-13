import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import * as Actions from '../Actions/User'
import { RootState } from '../Store'
import { NetInfo } from 'react-native'

export const refreshNewWorkType: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = () => async (dispatch, getState) => {
    const isConnect = NetInfo.isConnected.fetch()
    if(!isConnect) {
        dispatch(Actions.changeNetworkType('none'))
    }
    const isOnZJUWLAN = await returnIsOnZJUWLAN()
    if(isOnZJUWLAN) {
        dispatch(Actions.changeNetworkType('in'))
    } else {
        dispatch(Actions.changeNetworkType('out'))
    }
    return dispatch(Actions.init())
}


const returnIsOnZJUWLAN = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        let timer = setTimeout(() => resolve(false), 1500)
        try {
            fetch('https://api-v2.cc98.org/config/index').then(res => {
                clearTimeout(timer)
                if(res.ok) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        } catch(e) {
            resolve(false)
        }
    })
}
