import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'



export default class NewRoomCreateView extends Component {
  constructor() {
    super()
    this.state = {
      roomName: '',

    }
  }

  render(){
    return(
      <View>
        <Text>NEW ROOM VIEW</Text>
        {console.log(this.props.navigation.state.params.userData)}
      </View>
    )
  }
}

// userData: this.props.userData