import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native'

export default class SearchResult extends Component {

    render() {
        const result = this.props.result["0"]
        console.log("almost there...", result)
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={{
                    padding: 0,
                    backgroundColor: '#F8F8F8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                    flex: 1
                }}>
                <View style={{ flex: 1, flexDirection: "row", padding: 10, alignItems: "center" }}>
                    <Image style={{ width: 40, height: 40 }} source={{ uri: result.image }} />
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>                        <Text>{result.name}</Text>
                        <Text>{result.artist}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
