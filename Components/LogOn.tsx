import * as React from 'react'
import { Text, TextInput, View, Button} from 'react-native'

export default class LogOn extends React.Component {
    render() {
        return (
            <View>
                <View><Text>用户名</Text><TextInput /></View>
                <View><Text>密码</Text><TextInput /></View>
                <View><Button title="登陆" onPress={() => null} /></View>
            </View>
        )
    }
}
