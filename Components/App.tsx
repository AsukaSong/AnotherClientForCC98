import * as React from 'react'
import LogOn from './LogOn'
import { Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

export default createBottomTabNavigator({
    '主页': () => <Text>Home</Text>,
    'Test': LogOn
})