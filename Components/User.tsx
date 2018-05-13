import * as React from 'react'
import { View, Image, ScrollView, Text, StyleSheetProperties, Button, TouchableHighlight } from 'react-native'
import store, { RootState } from '../Store'
import { changeTitle, logOff } from '../Actions/User'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as storage from '../Utility/StorageUtility'

interface Props {
    userInfo: UserInfo
    logOff: () => void
    navigation: any
}

export class UserItem extends React.PureComponent<Props> {
    componentDidMount() {
        store.dispatch(changeTitle('用户中心'))
    }

    componentWillReceiveProps(newProps) {
        if(newProps.navigation.isFocused()) {
            store.dispatch(changeTitle('用户中心'))
        }
    }

    logOff = async () => {
        await Promise.all([
            storage.removeStorage('accessToken'),
            storage.removeStorage('userInfo'),
        ])
        this.props.logOff()
        this.props.navigation.replace('LogOn')
    }

    render() {
        const style = {
            borderBottomColor: '#aaaaaa', 
            borderBottomWidth: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
        } as any
        return (
            <ScrollView>
                <TouchableHighlight underlayColor="#cccccc"><View style={{ margin: 10, ...style, marginBottom: 0, }}>
                    <Image source={{ uri: this.props.userInfo.portraitUrl }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                    <Text style={{ fontSize: 30 }}>{this.props.userInfo.name}</Text>
                    <Icon name="angle-right" size={40} color="#aaaaaa" />
                </View></TouchableHighlight>
                <TouchableHighlight underlayColor="#cccccc"><View style={{ ...style }}>
                    <Text style={{ fontSize: 20 }}>我的主题</Text>
                    <Icon name="angle-right" size={40} color="#aaaaaa" />
                </View></TouchableHighlight>
                <TouchableHighlight underlayColor="#cccccc"><View style={{ ...style }}>
                    <Text style={{ fontSize: 20 }}>我的收藏</Text>
                    <Icon name="angle-right" size={40} color="#aaaaaa" />
                </View></TouchableHighlight>
                <TouchableHighlight underlayColor="#cccccc"><View style={{ ...style }}>
                    <Text style={{ fontSize: 20 }}>关注版面</Text>
                    <Icon name="angle-right" size={40} color="#aaaaaa" />
                </View></TouchableHighlight>
                <TouchableHighlight underlayColor="#cccccc"><View style={{ ...style }}>
                    <Text style={{ fontSize: 20 }}>关注用户</Text>
                    <Icon name="angle-right" size={40} color="#aaaaaa" />
                </View></TouchableHighlight>
                <TouchableHighlight underlayColor="#cccccc"><View style={{ ...style ,borderBottomWidth: 0 }}>
                    <Text style={{ fontSize: 20 }}>我的粉丝</Text>
                    <Icon name="angle-right" size={40} color="#aaaaaa" />
                </View></TouchableHighlight>
                <View style={{ ...style, flexDirection: 'column', borderBottomWidth: 0, margin: 10 }}>
                    <TouchableHighlight 
                        underlayColor="#dd2300"
                        onPress={this.logOff} 
                        style={{ backgroundColor: "#FF4500", width: 380, height: 50, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center' }}
                    ><Text style={{ fontSize: 20 }} >退出登陆</Text></TouchableHighlight>
                </View>
            </ScrollView>
        )
    }
}

const mapState = (state: RootState) => ({
    userInfo: state.user.userInfo
})

const mapDispatch = (dispatch) => ({
    logOff: () => {
        dispatch(logOff())
    }
})

export const User = connect(mapState, mapDispatch)(UserItem)