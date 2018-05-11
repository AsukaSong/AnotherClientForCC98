import * as React from 'react'
import { Text, TextInput, View, Button} from 'react-native'
import axios from 'axios'
import * as storage from '../Utility/StorageUtility'
import { RootState } from '../Store';
import { logOn } from '../Actions/User';
import { connect } from 'react-redux';

interface State {
    username: string
    password: string
}

interface Props {
    logOn: () => void
    isLogOn: boolean
}

class LogOn extends React.Component<Props, State> {
    state: State = {
        username: '',
        password: ''
    }

    logOn = async () => {
        try {
            let requestBody = {
                'client_id': '42cb8d05-eb88-4e97-cfaa-08d5a073b73c',
                'client_secret': '21ddeeb8-1f50-4bf9-856e-df4a2b6912c9',
                'grant_type': 'password',
                'username': this.state.username,
                'password': this.state.password,
                'scope': "cc98-api openid offline_access"
            }

            console.log(Object.keys(requestBody).map(key => `${key}=${encodeURIComponent(requestBody[key])}`).join('&'))
            let res = await axios({
                url: 'https://openid.cc98.org/connect/token',
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: Object.keys(requestBody).map(key => `${key}=${encodeURIComponent(requestBody[key])}`).join('&')
            })

            storage.setStorage('accessToken', res.data.access_token, res.data.expires_in * 1000)
            storage.setStorage('username', this.state.username)
            storage.setStorage('password', this.state.password)

            this.props.logOn()
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        console.log(this.props.isLogOn)

        return (
            <View>
                <View>
                    <Text>用户名</Text>
                    <TextInput value={this.state.username} onChangeText={(username) => this.setState({ username })} />
                </View>
                <View>
                    <Text>密码</Text>
                    <TextInput value={this.state.password} onChangeText={(password) => this.setState({ password })} secureTextEntry={true} />
                </View>
                <View>
                    <Button title="登陆" onPress={this.logOn} />
                </View>
            </View>
        )
    }
}

const mapState = (state: RootState) => ({
    isLogOn: state.user.isLogOn
})

const mapDispatch = (dispatch) => ({
    logOn: () => {
        dispatch(logOn())
    }
})

export default connect(mapState, mapDispatch)(LogOn)