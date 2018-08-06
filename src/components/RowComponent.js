import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import styles from "./styles"


export default class RowComponent extends Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={{
                    padding: 0,
                    backgroundColor: '#F8F8F8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                }}
                {...this.props.sortHandlers}
            >
                <View style={{ flex: 1, flexDirection: "row", padding: 10, alignItems: "center" }}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={{ uri: this.props.data.image }}
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                        }}>{this.props.data.artist} </Text><Text>{this.props.data.name} </Text>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}

