import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native'
import firestore from "../../server/fireBase"


export default class SearchResult extends Component {
    constructor() {
        super()
        this.addToQueue = this.addToQueue.bind(this)
        this.addData = this.addData.bind(this)

    }
    addToQueue() {
        const result = this.props.result["0"]
        console.log("added to queue")
        this.addData({
            name: result.name,
            artist: result.artist,
            image: result.image
        })
        this.props.refresh()
        this.props.contract()
    }
    addData(obj) {
        firestore.collection("songs").add(obj)
    }
    render() {
        const result = this.props.result["0"]
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
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                        }}>{result.artist}</Text>

                        <Text>{result.name}</Text>
                    </View>
                    <View>
                        <Text labelStyle={{
                            marginTop: 20,
                            color: "#000000",
                            fontWeight: "bold",
                            fontSize: 15,
                            fontFamily: 'myriadPro',
                        }} onPress={this.addToQueue} >Add To Queue</Text>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}
