import * as React from 'react'
import { } from 'react-native'
import store from '../Store'
import { changeTitle } from '../Actions/User'

export class Message extends React.PureComponent {
    componentDidMount() {
        store.dispatch(changeTitle('消息中心'))
    }

    componentWillReceiveProps(newProps) {
        if(newProps.navigation.isFocused()) {
            store.dispatch(changeTitle('消息中心'))
        }
    }

    render() {
        return null
    }
}