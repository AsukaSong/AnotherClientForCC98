import * as React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { BoardListInfo } from '../TypeDefinitions/BoardListInfo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { withNavigation } from 'react-navigation'

interface Props {
    info: BoardListInfo
    navigation: any
}

class Board extends React.PureComponent<Props> {
    render() {
        return (
            <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                <View style={{ borderBottomColor: '#aaaaaa', borderBottomWidth: 1, height: 50, alignItems: 'center', paddingTop: 12 }}>
                    <Text style={{ fontSize: 20 }}>{this.props.info.name}</Text>
                </View>
                <View>
                    {this.props.info.boards.map(item => <TouchableHighlight 
                        onPress={() => this.props.navigation.navigate('Board', { boardId: item.id, title: item.name })}
                        underlayColor="#cccccc"
                    >
                        <View 
                            style={{ alignItems: 'center', height:50, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#aaaaaa', borderBottomWidth: 1 }}
                        >
                            <Text style={{ fontSize: 20 }}>{item.name}</Text>
                            <Icon name="angle-right" size={40} color="#aaaaaa" />
                        </View>
                    </TouchableHighlight>)}
                </View>
            </View>
        )
    }
}

export const BoardItem = withNavigation(Board)