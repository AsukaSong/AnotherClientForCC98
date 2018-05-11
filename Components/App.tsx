import * as React from 'react'
import LogOn from './LogOn'
import { Text } from 'react-native'
import { 
    createBottomTabNavigator,
    createSwitchNavigator
 } from 'react-navigation'
import { Provider } from 'react-redux'
import store from '../Store'

const Navigator = createBottomTabNavigator({
    '主页': () => <Text>主页</Text>,
    '版面': () => <Text>版面</Text>,
    '关注': () => <Text>关注</Text>,
    '我的': () => <Text>我的</Text>,
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