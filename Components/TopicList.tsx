import * as React from 'react'
import {
    Text,
    ScrollView,
    View,
    TouchableHighlight,
    ActivityIndicator,
    RefreshControl,
    FlatList
} from 'react-native'
import { cFetch } from '../Utility/FetchUtility'
import { HotTopicInfo } from '../TypeDefinitions/HotTopicInfo'
import { TopicInfo } from '../TypeDefinitions/TopicInfo'
import { TopicItem } from './TopicItem'
import { connect } from 'react-redux'
import store from '../Store'
import { changeTitle } from '../Actions/User';

interface Props {
    navigation: any
}


interface State {
    infos: TopicInfo[]
    isLoading: boolean
    isLoadFinished: boolean
    historyTitle: string
}

export class TopicList extends React.PureComponent<Props, State> {
    state: State = {
        infos: [],
        isLoading: false,
        isLoadFinished: false,
        historyTitle: store.getState().user.title
    }

    getTopic = async () => {
        try {
            if(this.state.isLoading) return;
            this.setState({ isLoading: true })
            const id = this.props.navigation.getParam('boardId')
            console.log(id)
            let res = await cFetch(`/board/${id}/topic?from=${this.state.infos.length}&size=20`)
            let infos = await res.json() as TopicInfo[]
            const length = infos.length
            this.setState((prevState) => {
                const prevInfos = prevState.infos
                while(infos[0] && prevInfos.some(item => item.id === infos[0].id)) {
                    infos.shift()
                }
                return {
                    isLoading: false,
                    infos: prevInfos.concat(infos),
                    isLoadFinished: length < 20
                }
            })
        } catch(e) {
            console.error(e)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    componentDidMount() {
        store.dispatch(changeTitle(this.props.navigation.getParam('title')))
        this.getTopic()
    }

    componentWillUnmount() {
        store.dispatch(changeTitle(this.state.historyTitle))
    }

    render() {
        if(this.state.infos.length === 0) {
            return <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        } else {
            return (
                <FlatList 
                    data={this.state.infos.map(item => ({ topic: item }))}
                    renderItem={({ item }) => <TopicItem key={item.topic.id} info={item.topic} />}
                    onEndReached={this.getTopic}
                    onEndReachedThreshold={0.05}
                    ListFooterComponent={this.state.isLoadFinished ? () => <View style={{ alignItems: 'center', margin: 20 }}><Text style={{ color: '#aaaaaa' }}>没有更多了</Text></View> : null}
                    onRefresh={() => this.setState({ infos: [], isLoadFinished: false }, this.getTopic)}
                    refreshing={this.state.isLoading}
                ></FlatList>
            )
        }
    }
}
