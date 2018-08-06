import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ListView, TouchableHighlight, Image, ActivityIndicator, ScrollView } from 'react-native'

import RoomComponent from './RoomComponent'
import firestore from "../../server/fireBase"
import styles from "./styles"


class FindCreateListeningRoom extends Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
      loading: true
    }

    this.handlePress = this.handlePress.bind(this)
    this.componentHandlePress = this.componentHandlePress.bind(this)
    this.retrieveRooms = this.retrieveRooms.bind(this)
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

  handlePress() {
    const { navigate } = this.props.navigation;
    navigate('NewRoomCreateView', { userData: this.props.navigation.state.params.userData, retrieve: this.retrieveRooms })
  }

  componentHandlePress() {
    const { navigate } = this.props.navigation;
    console.log("pressed")
    navigate('ListeningRoomView', { resultTwo: this.props.navigation.state.params.resultTwo })
  }

  componentWillMount() {
    console.log("Passed from AccountSetup to FindCreateListeningRoom", this.props.navigation.state.params.resultTwo)
    this.retrieveRooms()
    setTimeout(() => this.setState({ loading: false }), 2000);
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View>
            <Text style={styles.text}>Available Listening Rooms</Text>
            {this.state.loading ?
              <View style={{
                flex: 1,
                justifyContent: 'center'
              }}>
                <ActivityIndicator size="large" color="#000000" />
              </View> :
              (<ScrollView>
                {this.state.rooms.map((room) =>
                  (
                    <View key={room.key} >
                      <RoomComponent room={room} onPress={this.componentHandlePress} />
                    </View>
                  ))}
              </ScrollView>)

            }

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

export default FindCreateListeningRoom