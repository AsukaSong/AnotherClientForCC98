import * as React from 'react'
import LogOn from './LogOn'
import { Text } from 'react-native'
import { 
    createBottomTabNavigator,
    createSwitchNavigator
 } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import store, { RootState } from '../Store'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MainPage } from './MainPage/MainPage'
import * as storage from '../Utility/StorageUtility'
import { init } from '../AsyncActions/init'

interface Props {
    isLogOn: boolean
    isLoading: boolean
    init: () => void
}

class App extends React.Component<Props> {
    async componentDidMount() {
        this.props.init()
    }

    getIconNameByRouteName(name: string): string {
        switch(name) {
            case '主页': return 'home' 
            case '版面': return 'list'
            case '消息': return 'comment-o'
            case '我的': return 'user'
        }
    }

    render() {
        const Navigator = createBottomTabNavigator({
            '主页': MainPage,
            '版面': () => <Text>版面</Text>,
            '消息': () => <Text>消息</Text>,
            '我的': () => <Text>我的</Text>,
        },
        {
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName = this.getIconNameByRouteName(navigation.state.routeName)
                    return <Icon name={iconName} style={{ color: focused ? '#00a4db' : ''}} size={25} />
                }
            })
        })
        
        const RootNav = createSwitchNavigator({
            LogOn: {
                screen: LogOn
            },
            Main: {
                screen: Navigator
            },
        }, {
            initialRouteName: this.props.isLogOn ? 'Main' : 'LogOn'
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