import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ListView } from 'react-native'

import RoomComponent from './RoomComponent'
import firestore from "../../server/fireBase"

class FindCreateListeningRoom extends Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
    }

    this.handlePress = this.handlePress.bind(this)
    this.componentHandlePress = this.componentHandlePress.bind(this)
  }
  async retrieveRooms() {
    const roomsArray = []
    await firestore.collection("Rooms").get().then(roomList => {
      roomList.forEach(room => {
        roomsArray.push(room.data())
      })
    })
    this.setState({ rooms: roomsArray })
  }
  createRoom() {

  }

  handlePress () {
    const {navigate} = this.props.navigation;
    navigate('NewRoomCreateView', {userData: this.props.navigation.state.params.userData})
  }

  componentHandlePress(){ 
    const {navigate} = this.props.navigation;
    navigate('ListeningRoomView', {})
  }  

  componentDidMount() {
    this.retrieveRooms()
  }

  render() {
    return (
      <React.Fragment>
        <View>
          <View>
            <Text onPress={this.handlePress}>New Listening Room</Text>
          </View>
          <View>
            <Text>Available Listening Rooms</Text>
            {this.state.rooms.map((room) =>
              (
                <View key={room.key} >
                  <RoomComponent room={room} onPress={this.componentHandlePress}/>
                </View>)
            )}
          </View>
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1 / 5,
    backgroundColor: '#fff',
  },
  upperContainerSubContainer: {
    flex: 1 / 2, flexDirection: "row", justifyContent: "flex-end"
  },
  upperContainerSuperContainer: {
    flex: 1 / 2, justifyContent: "flex-start"
  },
  lowerContainer: {
    flex: 1
  }
});

export default FindCreateListeningRoom