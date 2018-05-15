import * as React from 'react'
import LogOn from './LogOn'
import { Text, View, NetInfo } from 'react-native'
import { 
    createBottomTabNavigator,
    createStackNavigator,
    createTabNavigator
 } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import store, { RootState } from '../Store'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HotTopic } from './MainPage/HotTopic'
import * as storage from '../Utility/StorageUtility'
import { init } from '../AsyncActions/init'
import { PostList } from './PostList'
import { BoardList } from './BoardList'
import { Title } from './Title'
import { User } from './User'
import { Message } from './Message'
import { TopicList } from './TopicList'
import { netWorkType } from '../Config/netWorkType'
import { refreshNewWorkType } from '../AsyncActions/refreshNetWorkType'
import { PastTopic } from './MainPage/PastTopic'
import { FocusBoardTopicList } from './MainPage/FocusBoardTopicList'
import { FocusUserTopicList } from './MainPage/FocusUserTopicList'
import NavigationService from '../NavigateService'

const HomeNav = createTabNavigator({
    '热门话题': HotTopic,
    '往年今日': PastTopic,
    '关注版面': FocusBoardTopicList,
    '关注用户': FocusUserTopicList,
}, {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        style: {
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: '#ffffff',
        }
    },
    navigationOptions:({ navigation }) => ({
        tabBarLabel: ({ focused }) => {
            const title = navigation.state.routeName
            return () => <Text style = {{ 
                color: focused ? '#00a4db' : '#000000', 
                fontSize: 17,
                marginBottom: 7
            }}>{title}</Text>
        }
    })
})

const AppNavigator = createBottomTabNavigator({
    '主页': HomeNav,
    '版面': BoardList,
    '消息': Message,
    '我的': User,
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = getIconNameByRouteName(navigation.state.routeName)
            return <Icon name={iconName} style={{ color: focused ? '#00a4db' : undefined }} size={25} />
        },
        tabBarOptions: {
            showLabel: false
        },
    })
})

function getIconNameByRouteName(name: string): string {
    switch(name) {
        case '主页': return 'home' 
        case '版面': return 'list'
        case '消息': return 'comment-o'
        case '我的': return 'user'
    }
}

const RootNav = createStackNavigator({
    LogOn: {
        screen: LogOn
    },
    Main: {
        screen: AppNavigator
    },
    Topic: {
        screen: PostList
    },
    Board: {
        screen: TopicList
    }
}, {
    initialRouteName: 'LogOn',
    navigationOptions: ({ navigation }) => ({
        headerTitle: Title
    })
})

interface Props {
    isLogOn: boolean
    isLoading: boolean
    netWorkType: netWorkType
    init: () => void
}

class App extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.init()
        NetInfo.addEventListener('connectionChange', () => {
            store.dispatch(refreshNewWorkType())
        })
    }


    render() {
        console.log(this.props.isLoading)
        console.log(this.props.netWorkType)
        if(this.props.isLoading) {
            return null
        } else {
            return <RootNav ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
        }
    }
}

const mapState = (state: RootState) => ({
    isLogOn: state.user.isLogOn,
    isLoading: state.user.isLoading,
    netWorkType: state.user.netWorkType
})

const mapDispatch = (dispatch) => ({
    init: () => {
        dispatch(init())
    }
})

const AppConnected = connect(mapState, mapDispatch)(App)

export default () => <Provider store={store}><AppConnected /></Provider>