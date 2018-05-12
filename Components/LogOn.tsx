import * as React from 'react'
import { Text, TextInput, View, Button} from 'react-native'
import * as storage from '../Utility/StorageUtility'
import { RootState } from '../Store'
import { logOn, updateUserInfo } from '../Actions/User'
import { connect } from 'react-redux'
import { cFetch } from '../Utility/FetchUtility'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import { withNavigation } from 'react-navigation'

interface State {
    username: string
    password: string
}

interface Props {
    logOn: (userInfo: UserInfo) => void
    isLogOn: boolean
    userInfo: UserInfo
    // for react-navigation
    navigation: any
}

class LogOn extends React.PureComponent<Props, State> {
    state: State = {
        username: '',
        password: ''
    }

    static navigationOptions = {
        title: '登陆',
        headerStyle: { 
            alignContent: 'center'
        }
    }

    async componentDidMount() {
        let username = await storage.getStorage('username')
        let password = await storage.getStorage('password')
        this.setState({
            username,
            password
        })
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

            let res = await fetch('https://openid.cc98.org/connect/token', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: Object.keys(requestBody).map(key => `${key}=${encodeURIComponent(requestBody[key])}`).join('&')
            })

            let data = await res.json()

            console.log(data)

            await storage.setStorage('accessToken', data.token_type + ' ' + data.access_token, data.expires_in * 1000)
            await storage.setStorage('username', this.state.username)
            await storage.setStorage('password', this.state.password)

            res = await cFetch('/me')
            data = await res.json() as UserInfo

            console.log(data)

            this.props.logOn(data)
            this.props.navigation.navigate('Main')
        } catch(e) {
            console.log(e)
        }
    }

    render() {
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
    isLogOn: state.user.isLogOn,
    userInfo: state.user.userInfo
})

const mapDispatch = (dispatch) => ({
    logOn: (userInfo: UserInfo) => {
        dispatch(logOn())
        dispatch(updateUserInfo(userInfo))
    }
})

export default connect(mapState, mapDispatch)(withNavigation(LogOn))
