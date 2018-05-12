import * as React from 'react'
import { 
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TopicInfo } from '../TypeDefinitions/TopicInfo'

interface Props {
    info: TopicInfo
}

export class TopicItem extends React.Component<Props> {
    render() {
        return (
            <TouchableHighlight><View style={{ padding: 10 }}>
                <Text style={{ color: '#00a4db', marginBottom: 15 }}>{this.props.info.title}</Text>
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="user" style={{ marginRight: 5 }} />
                        <Text>{this.props.info.userName}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="comment-o" style={{ marginRight: 5 }} />
                        <Text>{this.props.info.replyCount}</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="clock-o" style={{ marginRight: 5 }} />
                        <Text>{this.props.info.lastPostTime.replace('T', ' ')}</Text>
                    </View>
                </View>
            </View></TouchableHighlight>
        )
    }
}
