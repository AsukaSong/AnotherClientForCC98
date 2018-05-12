import * as React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { RootState } from '../Store'

interface Props {
    title: string
}

class TitleItem extends React.PureComponent<Props> {
    render() {
        return (
            <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.props.title}</Text>
            </View>
        )
    }
}

const mapState = (state: RootState) => ({
    title: state.user.title
})

export const Title = connect(mapState)(TitleItem)
