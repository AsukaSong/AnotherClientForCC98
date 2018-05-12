import * as React from 'react'
import LogOn from './LogOn'
import { Text, View } from 'react-native'
import { 
    createBottomTabNavigator,
    createStackNavigator
 } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import store, { RootState } from '../Store'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MainPage } from './MainPage'
import * as storage from '../Utility/StorageUtility'
import { init } from '../AsyncActions/init'
import { Topic } from './TopicList'
import { BoardList } from './BoardList'
import { Title } from './Title'

const Navigator = createBottomTabNavigator({
    '主页': MainPage,
    '版面': BoardList,
    '消息': () => <Text>消息</Text>,
    '我的': () => <Text>我的</Text>,
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = getIconNameByRouteName(navigation.state.routeName)
            return <Icon name={iconName} style={{ color: focused ? '#00a4db' : '', marginTop: 5 }} size={25} />
        },
        tabBarOptions: {
            activeTintColor: '#00a4db',
            labelStyle: {
                marginBottom: 5,
            }
        }
    })
})

const RootNav = createStackNavigator({
    LogOn: {
        screen: LogOn
    },
    Main: {
        screen: Navigator
    },
    Topic: {
        screen: Topic
    }
}, {
    initialRouteName: 'Main',
    navigationOptions: {
        headerTitle: Title
    }
})

function getIconNameByRouteName(name: string): string {
    switch(name) {
        case '主页': return 'home' 
        case '版面': return 'list'
        case '消息': return 'comment-o'
        case '我的': return 'user'
    }
}

interface Props {
    isLogOn: boolean
    isLoading: boolean
    init: () => void
}

class App extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.init()
    }

    render() {
        if(this.props.isLoading) {
            return null
        } else {
            return <RootNav />
        }
    }
}

const mapState = (state: RootState) => ({
    isLogOn: state.user.isLogOn,
    isLoading: state.user.isLoading,
})

const mapDispatch = (dispatch) => ({
    init: () => {
        console.log('app loading')
        dispatch(init())
    }
})

const AppConnected = connect(mapState, mapDispatch)(App)

export default () => <Provider store={store}><AppConnected /></Provider>