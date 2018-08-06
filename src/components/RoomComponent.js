import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native'

export default class RoomComponent extends Component {
  constructor(){
    super()
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(){
    this.props.onPress()
  }

  render() {
    return (
      <View onPress={this.handlePress}>
        <TouchableHighlight
          underlayColor={'#eee'}
          style={{
            padding: 0,
            backgroundColor: '#F8F8F8',
            borderBottomWidth: 1,
            borderColor: '#eee',
          }}
        // {...this.props.sortHandlers}
        >
          <View>
            <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.room.owner.image }}/>
            <View>
              <Text onPress={this.handlePress}>{this.props.room.roomName}</Text>
              <Text>7 Listeners</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}