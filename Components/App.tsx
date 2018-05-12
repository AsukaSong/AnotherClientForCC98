import * as React from 'react'
import LogOn from './LogOn'
import { Text } from 'react-native'
import { 
    createBottomTabNavigator,
    createSwitchNavigator
 } from 'react-navigation'
import { Provider } from 'react-redux'
import store from '../Store'
import Icon from 'react-native-vector-icons/FontAwesome'

function getIconNameByRouteName(name: string): string {
    switch(name) {
        case '主页': return 'home' 
        case '版面': return 'list'
        case '消息': return 'comment-o'
        case '我的': return 'user'
    }
}

const Navigator = createBottomTabNavigator({
    '主页': () => <Text>主页</Text>,
    '版面': () => <Text>版面</Text>,
    '消息': () => <Text>消息</Text>,
    '我的': () => <Text>我的</Text>,
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = getIconNameByRouteName(navigation.state.routeName)
            return <Icon name={iconName} style={{ color: focused ? 'blue' : ''}} size={25} />
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
})

export default () => <Provider store={store}><RootNav /></Provider>