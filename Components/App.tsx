import * as React from 'react'
import LogOn from './LogOn'
import { Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from '../Store'

const Navigator = createBottomTabNavigator({
    '主页': LogOn,
    'Test': LogOn
})

export default () => <Provider store={store}><Navigator /></Provider>