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

interface Props {
    isLogOn: boolean
    isLoading: boolean
    init: () => void
}

interface State {
    title: string
}

class App extends React.PureComponent<Props, State> {
    state: State = {
        title: '热门话题'
    }

    async componentDidMount() {
        this.props.init()
    }

    getIconNameByRouteName(name: string): string {
        switch(name) {
            case 'main': return 'home' 
            case 'list': return 'list'
            case 'message': return 'comment-o'
            case 'usercenter': return 'user'
        }
    }

    getTitleByRouteName(name: string) {
        switch(name) {
            case 'main': return '主页' 
            case 'list': return '版面'
            case 'message': return '消息'
            case 'usercenter': return '我的'
        }
    }

    render() {
        const Navigator = createBottomTabNavigator({
            'main': MainPage,
            'list': () => <Text>版面</Text>,
            'message': () => <Text>消息</Text>,
            'usercenter': () => <Text>我的</Text>,
        },
        {
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName = this.getIconNameByRouteName(navigation.state.routeName)
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

        Navigator.navigationOptions = {
            title: this.state.title
        }
        
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
            initialRouteName: this.props.isLogOn ? 'Main' : 'LogOn',
        })

        if(this.props.isLoading) {
            return null
        } else {
            return <RootNav />
        }
    }
}

const mapState = (state: RootState) => ({
    isLogOn: state.user.isLogOn,
    isLoading: state.user.isLoading
})

const mapDispatch = (dispatch) => ({
    init: () => {
        console.log('app loading')
        dispatch(init())
    }
})

const AppConnected = connect(mapState, mapDispatch)(App)

export default () => <Provider store={store}><AppConnected /></Provider>