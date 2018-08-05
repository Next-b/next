import React, {Component} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native'

export default class RoomComponent extends Component {
  render(){
    return (
      <View>
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
            <Image style={{width: 50, height:50}} source={{uri: this.props.room.owner.image}} />
            <View>
              <Text>{this.props.room.roomName}</Text>
              <Text>7 Listeners</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}