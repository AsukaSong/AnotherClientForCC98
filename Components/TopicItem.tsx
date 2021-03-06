import * as React from 'react'
import { 
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TopicInfo } from '../TypeDefinitions/TopicInfo'
import { withNavigation } from 'react-navigation'

interface Props {
    info: TopicInfo
    navigation?: any
}

@withNavigation
export class TopicItem extends React.PureComponent<Props> {
    render() {
        return (
            <TouchableHighlight 
                underlayColor="#cccccc"
                style={{ padding: 0 }}
                onPress={() => this.props.navigation.navigate('Topic', { topicId: this.props.info.id, title: this.props.info.title, isAnonymous: this.props.info.isAnonymous })}
            ><View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgb(200,200,200)' }}>
                <Text numberOfLines={1} style={{ color: '#00a4db', marginBottom: 10, fontSize: 17 }}>{this.props.info.title}</Text>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="user" style={{ marginRight: 5 }} />
                        <Text>{this.props.info.userName || '匿名'}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="comment-o" style={{ marginRight: 5 }} />
                        <Text>{this.props.info.replyCount}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="clock-o" style={{ marginRight: 5 }} />
                        <Text>{this.props.info.lastPostTime.replace('T', ' ').slice(0, 19)}</Text>
                    </View>
                </View>
            </View></TouchableHighlight>
        )
    }
}
