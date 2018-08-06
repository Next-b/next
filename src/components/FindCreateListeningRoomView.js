import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ListView, TouchableHighlight, Image } from 'react-native'

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
  static navigationOptions = {
    header: null
  };
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

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('NewRoomCreateView', { userData: this.props.navigation.state.params.userData })
  }

  componentHandlePress() {
    const { navigate } = this.props.navigation;
    console.log("pressed")
    navigate('ListeningRoomView', { resultTwo: this.props.navigation.state.params.resultTwo })
  }

  componentDidMount() {
    console.log("Passed from AccountSetup to FindCreateListeningRoom", this.props.navigation.state.params.resultTwo)
    this.retrieveRooms()
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View>
            <Text style={styles.text}>Available Listening Rooms</Text>
            {this.state.rooms.map((room) =>
              (
                <View key={room.key} >
                  <RoomComponent room={room} onPress={this.componentHandlePress} />
                </View>)
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", right: 15, bottom: 15, position: "absolute" }}>
            <TouchableHighlight onPress={this.handlePress}>
              <Image style={styles.imagestyle} source={require('./public/plus.png')} />
            </TouchableHighlight>
          </View>
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 40,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: 'myriadPro',
    textDecorationLine: "underline"

  },
  lowerContainer: {
    flex: 1
  },
  imagestyle: {
    width: 70,
    height: 70,
  },
});

export default FindCreateListeningRoom