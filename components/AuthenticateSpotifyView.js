import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, WebView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import firebaseApp from "../server/fireBase"

export default class AuthenticateSpotifyView extends Component {
  static navigationOptions = {
    title: 'Log in with Spotify',
  }

  render() {
    const { navigate } = this.props.navigation;
  //   // return (
  //   //   <View style={styles.container}>
  //   //     <Text>Testing</Text>
  //   //     <WebView source={{uri: 'https://google.com/'}} style={{flex:1}} />
  //   //   </View>
  //   // )
  //   return (
  //     <View style={styles.container}>
  //       <WebView
  //         source={{ uri: 'http://localhost:8888' }}
  //         style={styles.page}
  //       />
  //     </View>
  //   )
  // }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  page: {
    marginTop: 40,
    width: 340,
    flex: 1
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',

//   },
//   video: {
//     marginTop: 20,
//     maxHeight: 200,
//     width: 320,
//     flex: 1
//   }
// });