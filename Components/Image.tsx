import * as React from 'react'
import { Image, ImageProperties, ImageURISource, ActivityIndicator, View, Dimensions } from 'react-native'

export interface ImageProps extends ImageProperties {
    source: ImageURISource
}

export interface ImageState {
    isLoading: boolean
    width: number
    height: number
}

export default class CustomImage extends React.Component<ImageProps, ImageState> {
    state: ImageState = {
        isLoading: true,
        width: 0,
        height: 0,
    }

    async componentDidMount() {
        Image.getSize(
            this.props.source.uri, 
            (width, height) => { 
                const windowWidth = Dimensions.get('window').width
                if(width > (windowWidth - 50)) {
                    this.setState({
                        width: windowWidth - 50,
                        height: height * (windowWidth - 50) / width,
                        isLoading: false
                    })
                }else {
                    this.setState({ width, height, isLoading: false }) 
                }
            },
            () => null
        )
    }

    render() {
        if(this.state.isLoading) return <ActivityIndicator style={{height: 500}} />
        return (
            <View style={{ height: this.state.height }}>
                <Image {...this.props} style={{ width: this.state.width, height: this.state.height, resizeMode: 'contain' }} />
            </View>
        )

    }
}
