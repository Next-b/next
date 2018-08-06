import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import styles from "./styles"


export default class RoomComponent extends Component {
  constructor() {
    super()
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress()
  }
  deleteRoom() {
    
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 0,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
          flexDirection: 'row',
          alignContent: "center"
        }}
        onPress={this.handlePress}
      // {...this.props.sortHandlers}
      >
        <View style={{ flex: 1, flexDirection: "row", padding: 10, alignItems: "center" }}>
          <Image style={{ width: 80, height: 80 }} source={{ uri: this.props.room.owner.image }} />
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold" }} >{this.props.room.roomName}</Text>
            <Text>7 Listeners</Text>
            <Text>Edit Room</Text>
            <Text onPress={this.deleteRoom}>Delete Room</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}



