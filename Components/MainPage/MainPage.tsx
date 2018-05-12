import * as React from 'react'
import {
    Text,
    ScrollView,
    View
} from 'react-native'
import { cFetch } from '../../Utility/FetchUtility'
import { HotTopicInfo } from '../../TypeDefinitions/HotTopicInfo'
import { TopicInfo } from '../../TypeDefinitions/TopicInfo'
import { TopicItem } from '../TopicItem'

interface State {
    infos: TopicInfo[]
    isLoading: boolean
}

export class MainPage extends React.Component<null, State> {
    state: State = {
        infos: [],
        isLoading: true
    }

    static navigationOptions = {
        title: 'Home',
    }

    async componentDidMount() {
        let res = await cFetch('/config/index')
        let data = (await res.json()).hotTopic as HotTopicInfo[]
        let infos = data.map((item) => ({
            title: item.title,
            userName: item.authorName || '匿名',
            replyCount: item.replyCount,
            lastPostTime: item.createTime
        }) as TopicInfo)
        this.setState({
            isLoading: false,
            infos
        })
    }

    render() {
        if(this.state.isLoading) {
            return <Text>加载中</Text>
        } else {
            return (
                <ScrollView style={{ paddingLeft: 10, paddingRight: 10}}>
                    {this.state.infos.map(item => <TopicItem info={item} />)}
                </ScrollView>
            )
        }
    }
}