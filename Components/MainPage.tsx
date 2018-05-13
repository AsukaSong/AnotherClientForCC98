import * as React from 'react'
import {
    Text,
    ScrollView,
    View,
    TouchableHighlight,
    ActivityIndicator,
    RefreshControl
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
}

export class MainPage extends React.PureComponent<Props, State> {
    state: State = {
        infos: [],
        isLoading: true,
    }

    getHotTopic = async () => {
        this.setState({ isLoading: true })
        try {        
            let res = await cFetch('/config/index')
            let data = (await res.json()).hotTopic as HotTopicInfo[]
            let infos = data.map((item) => ({
                title: item.title,
                userName: item.authorName || '匿名',
                replyCount: item.replyCount,
                lastPostTime: item.createTime,
                id: item.id,
                isAnonymous: item.boardId === 182
            }) as TopicInfo)
            
            this.setState({
                infos
            })
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }

    componentDidMount() {
        store.dispatch(changeTitle('热门话题'))
        this.getHotTopic()
    }

    componentWillReceiveProps(newProps) {
        if(newProps.navigation.isFocused()) {
            store.dispatch(changeTitle('热门话题'))
        }
    }

    render() {
        if(this.state.infos.length === 0) {
            return <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        } else {
            let items = this.state.infos.map(item => <TopicItem key={item.id} info={item} />)
            return (
                <ScrollView 
                    style={{ paddingLeft: 10, paddingRight: 10}}
                    refreshControl={<RefreshControl 
                        refreshing={this.state.isLoading}
                        onRefresh={this.getHotTopic}
                    />}
                >
                    {items}
                </ScrollView>
            )
        }
    }
}
