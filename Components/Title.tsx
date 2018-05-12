import * as React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { RootState } from '../Store'

interface Props {
    title: string
}

class TitleItem extends React.Component<Props> {
    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
            </View>
        )
    }
}

const mapState = (state: RootState) => ({
    title: state.user.title
})

export const Title = connect(mapState)(TitleItem)
