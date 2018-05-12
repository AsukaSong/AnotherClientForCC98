import * as React from 'react'
import { Text } from 'react-native'
import store from '../Store'
import { changeTitle } from '../Actions/User'

export class BoardList extends React.Component {
    componentDidMount() {
        store.dispatch(changeTitle('版面列表'))
    }

    componentWillReceiveProps(newProps) {
        if(newProps.navigation.isFocused()) {
            store.dispatch(changeTitle('版面列表'))
        }
    }

    render() {
        return <Text>aaaa</Text>
    }
}