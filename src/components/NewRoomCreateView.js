import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'
import firestore from "../../server/fireBase"

export default class NewRoomCreateView extends Component {
  constructor() {
    super()
    this.state = {
      roomName: '',

    }
    this.createRoom = this.createRoom.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }
  componentDidMount() {
    this.input.focus()
  }


  createRoom() {
    var userData = this.props.navigation.state.params.userData
    firestore.collection("Rooms").add({
      roomName: this.state.roomName,
      owner: {
        name: userData.display_name,
        image: userData.images[0].url
      }
    })
  }
  handlePress() {
    const { navigate } = this.props.navigation
    this.createRoom();
    this.props.navigation.state.params.retrieve()
    navigate('FindCreateListeningRoomView')

  }
  render() {
    return (
      <View>
        <FormLabel>Room Name: </FormLabel>
        <FormInput
          ref={input => this.input = input}
          inputStyle={{ textAlign: 'center', justifyContent: 'center' }}
          defaultValue={this.state.roomName}
          placeholder="Add room name"
          onChangeText={name => (this.setState({ roomName: name }))}
        />
        <Text onPress={this.handlePress}>Create Room</Text>
      </View>
    )
  }
}

// userData: this.props.userData