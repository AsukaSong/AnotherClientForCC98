import * as React from 'react'
import {
    Text,
    ScrollView,
    View,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'
import { cFetch } from '../Utility/FetchUtility'
import { HotTopicInfo } from '../TypeDefinitions/HotTopicInfo'
import { TopicInfo } from '../TypeDefinitions/TopicInfo'
import { TopicItem } from './TopicItem'

interface Props {
    navigation: any
}

interface State {
    infos: TopicInfo[]
    isLoading: boolean
}

export class MainPage extends React.Component<Props, State> {
    state: State = {
        infos: [],
        isLoading: true,
    }

    static navigationOptions = {
        title: '主页',
    }

    async componentDidMount() {
        let res = await cFetch('/config/index')
        let data = (await res.json()).hotTopic as HotTopicInfo[]
        let infos = data.map((item) => ({
            title: item.title,
            userName: item.authorName || '匿名',
            replyCount: item.replyCount,
            lastPostTime: item.createTime,
            id: item.id
        }) as TopicInfo)
        this.setState({
            isLoading: false,
            infos
        })
    }

    render() {
        if(this.state.isLoading) {
            return <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        } else {
            let items = this.state.infos.map(item => <TopicItem key={item.id} info={item} navigation={this.props.navigation} />)
            //添加分隔线
            for (let i = 1; i < items.length; i += 2) {
                items.splice(i, 0, <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(200,200,200)' }} key={i}/>);
            }
            return (
                <ScrollView style={{ paddingLeft: 10, paddingRight: 10}}>
                    {items}
                </ScrollView>
            )
        }
    }
}