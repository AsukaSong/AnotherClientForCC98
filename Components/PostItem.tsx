import * as React from 'react'
import { View, Image, Text, Button } from 'react-native'
import { PostInfo } from '../TypeDefinitions/PostInfo'
import { UserInfo } from '../TypeDefinitions/UserInfo'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
    info: PostInfo
    userInfo: UserInfo
}

export class PostItem extends React.PureComponent<Props> {
    render() { 
        return (
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', borderBottomColor: '#dddddd', borderBottomWidth: 1, padding: 10 }}>
                    <Image 
                        source={{ uri: this.props.userInfo.portraitUrl.replace('http', 'https').replace('httpss', 'https') }} 
                        style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: this.props.info.isAnonymous ? '#00a4db' : undefined }} 
                    />
                    <View style={{ flex: 1, justifyContent: 'space-around', paddingLeft: 20 }}>
                        <Text style={{ color: '#000000', fontSize: 20 }}>{this.props.userInfo.name}</Text>
                        <Text>{this.props.info.time.replace('T', ' ').slice(0, 19)}</Text>
                    </View>
                    <Text>{`#${this.props.info.floor}`}</Text>
                </View>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#dddddd', paddingBottom: 30, marginTop: 20  }}>
                    <Text style={{ fontSize: 20 }}>{this.props.info.content}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#bbbbbb' }}>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                        <Icon name='thumbs-o-up' size={17} />
                        <Text>{this.props.info.likeCount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                        <Icon name='thumbs-o-down' size={17} />
                        <Text>{this.props.info.dislikeCount}</Text>
                    </View>
                    <View style={{ flex: 6 }} />
                    <Button title="回复" onPress={() => null} />
                </View>
            </View>
        )
    }
}