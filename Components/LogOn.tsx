import * as React from 'react'
import { Text, TextInput, View, Button, Image, TouchableHighlight } from 'react-native'
import * as storage from '../Utility/StorageUtility'
import { RootState } from '../Store'
import { logOn, updateUserInfo, changeTitle } from '../Actions/User'
import { connect } from 'react-redux'
import { cFetch } from '../Utility/FetchUtility'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import { withNavigation } from 'react-navigation'
import store from '../Store'

interface State {
    username: string
    password: string
    isLoading: boolean
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
        password: '',
        isLoading: false,
    }

    componentWillReceiveProps(newProps) {
        if(newProps.navigation.isFocused()) {
            store.dispatch(changeTitle('用户登陆'))
        }
    }

    async componentDidMount() {
        store.dispatch(changeTitle('用户登陆'))
        let username = await storage.getStorage('username')
        let password = await storage.getStorage('password')
        this.setState({
            username,
            password
        })
    }

    logOn = async () => {
        try {
            const isZJUWLAN = store.getState().user.netWorkType === 'in'
            this.setState({ isLoading: true })
            let requestBody = {
                'client_id': '42cb8d05-eb88-4e97-cfaa-08d5a073b73c',
                'client_secret': '21ddeeb8-1f50-4bf9-856e-df4a2b6912c9',
                'grant_type': 'password',
                'username': this.state.username,
                'password': this.state.password,
                'scope': "cc98-api openid offline_access"
            }

            const url = isZJUWLAN ? 'openid.cc98.org' : 'openid0.cc98.inzju.com'

            let res = await fetch(`https://${url}/connect/token`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: Object.keys(requestBody).map(key => `${key}=${encodeURIComponent(requestBody[key])}`).join('&')
            })

            let data = await res.json()

            await storage.setStorage('accessToken', data.token_type + ' ' + data.access_token, data.expires_in * 1000)
            await storage.setStorage('username', this.state.username)
            await storage.setStorage('password', this.state.password)

            res = await cFetch('/me')
            data = await res.json() as UserInfo

            storage.setStorage('userInfo', data)
            this.props.logOn(data)
            this.props.navigation.replace('Main')
        } catch(e) {
            console.error(e)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        let style = {
            width: 300, 
            height: 30, 
            marginTop: 30, 
            borderBottomWidth: 1, 
            borderBottomColor: '#aaaaaa'
        } as any

        const isDisabled = !(this.state.password && this.state.username) || this.state.password.length < 6 || this.state.isLoading

        return (
            <View style={{ alignItems: 'center', paddingTop: 30 }} >
                <Image source={{ uri: 'https://www.cc98.org/static/98icon.ico' }} style={{ width: 150, height: 150 }} />
                <View style={{ ...style  }} >
                    <TextInput 
                        placeholder="请输入用户名" 
                        style={{ fontSize: 20 }} 
                        value={this.state.username} 
                        onChangeText={(username) => this.setState({ username })} 
                    />
                </View>
                <View style={{ ...style  }} >
                    <TextInput placeholder="请输入密码" style={{ fontSize: 20 }} value={this.state.password} onChangeText={(password) => this.setState({ password })} secureTextEntry={true} />
                </View>
                <View style={{ paddingTop: 30, flexDirection: 'column', borderBottomWidth: 0 }}>
                    <TouchableHighlight 
                        underlayColor="rgb(71, 182, 230)"
                        onPress={this.logOn} 
                        style={{ backgroundColor: isDisabled ? "#cccccc" : 'rgb(91, 202, 250)', width: 300, height: 50, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center' }}
                        disabled={isDisabled}
                    ><Text style={{ fontSize: 20, color: 'white' }} >登  陆</Text></TouchableHighlight>
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
