import * as React from 'react'
import { Text, FlatList, ActivityIndicator, View } from 'react-native'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import { PostInfo } from '../TypeDefinitions/PostInfo'
import { cFetch, getUsersInfo } from '../Utility/FetchUtility'
import { PostItem } from './PostItem'
import Icon from 'react-native-vector-icons/FontAwesome'
import { anonymousUserInfo } from '../Config/anonymousUserInfo'
import { notFoundUserInfo } from '../Config/notFoundUserInfo'

interface Props {
    navigation: any
}

interface State {
    userInfos: UserInfo[]
    posts: PostInfo[]
    isLoading: boolean
    isLoadFinished: boolean
}

export class Topic extends React.PureComponent<Props, State> {
    state = {
        userInfos: [],
        posts: [],
        isLoading: true,
        isLoadFinished: false
    }

    static navigationOptions = {
        title: '帖子'
    }

    getPosts = async () => {
        if(this.state.isLoadFinished) return;
        const id = this.props.navigation.getParam('topicId')
        const isAnonymous = this.props.navigation.getParam('isAnonymous')
        let res = await cFetch(`/Topic/${id}/post?from=${this.state.posts.length}&size=20`)
        let newPosts = await res.json() as PostInfo[]
        let userInfos: UserInfo[]
        console.log(isAnonymous)
        if(!isAnonymous) {
            let userIds = newPosts.map(item => item.userId)
            userInfos = await getUsersInfo(userIds)
        } else {
            userInfos = new Array(newPosts.length).fill(anonymousUserInfo)
        }
        this.setState((prevState: State) => ({
            userInfos: prevState.userInfos.concat(userInfos),
            posts: prevState.posts.concat(newPosts),
            isLoading: false,
            isLoadFinished: newPosts.length < 20
        }))
    }

    async componentDidMount() {
        this.getPosts()
    }

    render() {
        if(this.state.isLoading) {
            return <ActivityIndicator style={{ marginTop: 30 }} size='large' />
        } else {
            const title = this.props.navigation.getParam('title')
            return <FlatList 
                data={this.state.posts.map((item, index) => ({ post: item, userInfo: this.state.userInfos[index]}))}
                renderItem={({ item }) => <PostItem key={item.post.id} userInfo={item.userInfo || notFoundUserInfo} info={item.post} />}
                ListHeaderComponent={() => <View style={{ 
                        padding: 20, 
                        borderBottomWidth: 1, 
                        borderBottomColor: '#bbbbbb', 
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 20 }}>{title}</Text>
                        <Icon name='star-o' size={30} />
                    </View>}
                onEndReached={this.getPosts}
                onEndReachedThreshold={0.1}
            ></FlatList>
        }
    }
}
