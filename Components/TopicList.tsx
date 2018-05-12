import * as React from 'react'
import { Text, FlatList, ActivityIndicator } from 'react-native'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import { PostInfo } from '../TypeDefinitions/PostInfo'
import { cFetch, getUsersInfo } from '../Utility/FetchUtility'
import { PostItem } from './PostItem'


interface Props {
    navigation: any
}

interface State {
    userInfos: UserInfo[]
    posts: PostInfo[]
    isLoading: boolean
}

export class Topic extends React.PureComponent<Props, State> {
    state = {
        userInfos: [],
        posts: [],
        isLoading: true
    }

    static navigationOptions = {
        title: '帖子'
    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('topicId')
        let res = await cFetch(`/Topic/${id}/post?from=0&size=20`)
        let posts = await res.json() as PostInfo[]
        let userIds = posts.map(item => item.userId)
        let userInfos = await getUsersInfo(userIds)

        this.setState({
            userInfos,
            posts,
            isLoading: false
        })
    }

    render() {
        if(this.state.isLoading) {
            return <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        } else {
            return <FlatList 
                data={this.state.posts.map((item, index) => ({ post: item, userInfo: this.state.userInfos[index]}))}
                renderItem={({ item }) => <PostItem key={item.post.id} userInfo={item.userInfo} info={item.post} />}
            ></FlatList>
        }
    }
}
