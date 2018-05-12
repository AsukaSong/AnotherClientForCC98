import * as React from 'react'
import { Text, ScrollView, ActivityIndicator } from 'react-native'
import store from '../Store'
import { changeTitle } from '../Actions/User'
import { BoardListInfo } from '../TypeDefinitions/BoardListInfo'
import { cFetch } from '../Utility/FetchUtility'
import { BoardItem } from './BoardItem'

interface State {
    boardListInfos: BoardListInfo[]
}

export class BoardList extends React.PureComponent<null, State> {
    state = {
        boardListInfos: []
    }

    async componentDidMount() {
        store.dispatch(changeTitle('版面列表'))
        let res = await cFetch('/board/all')
        let boardListInfos = await res.json() as BoardListInfo[]
        this.setState({ boardListInfos })
    }

    componentWillReceiveProps(newProps) {
        if(newProps.navigation.isFocused()) {
            store.dispatch(changeTitle('版面列表'))
        }
    }

    render() {
        if(this.state.boardListInfos.length === 0) return <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        return (
            <ScrollView style={{ padding: 10 }}>
                {this.state.boardListInfos.map(item => <BoardItem info={item} />)}
            </ScrollView>
        )
    }
}