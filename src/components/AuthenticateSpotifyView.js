// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button, WebView, Linking } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';





// export default class AuthenticateSpotifyView extends Component {
//   static navigationOptions = {
//     title: 'Log in with Spotify',
//   }
//   componentDidMount() {
//     var url = "next://next-b"
//     Linking.canOpenURL(url).then(supported => {
//       if (!supported) {
//         console.log('Cant handle url: ' + url);
//       } else {
//         return Linking.openURL(url);
//       }
//     }).catch(err => console.error('An error occurred', err));

//   }
//   render() {

//     const { navigate } = this.props.navigation;
//     const url = 'https://accounts.spotify.com/authorize?client_id=f51009c9ffae4a90bc7a1364f46bb2fb&response_type=code&' + 'redirect_uri=' + encodeURIComponent("next://next-b") + 'scope=' + encodeURIComponent("user-read-private user-read-email")

//     console.log(url)
//     return (
//       <View style={styles.container}>
//         <WebView
//           source={{ uri: url }}
//           style={styles.page}
//         />
//       </View>
//     )
//   }
// }



// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom: 10,
//   },
//   page: {
//     marginTop: 40,
//     width: 340,
//     flex: 1
//   }
// });

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'space-between',

// //   },
// //   video: {
// //     marginTop: 20,
// //     maxHeight: 200,
// //     width: 320,
// //     flex: 1
// //   }
// // });


import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser, Linking, AuthSession } from 'expo';
import axios from "axios"
import { Base64 } from 'js-base64';
import { Buffer } from "buffer"
import qs from 'qs';


// import { url } from 'inspector';

export default class App extends Component {
  state = {
    resultOne: null,
    resultTwo: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.paragraph}
          title="Connect Spotify"
          onPress={this.retrieveAccessToken}
        />
        <Text>{this.state.resultOne && JSON.stringify(this.state.resultOne)}</Text>
      </View>
    );
  }

  retrieveAccessToken = async () => {
    let redirectUrl = "exp://expo.io/@alanyoho/next"
    let resultOne = await AuthSession.startAsync({
      authUrl: `https://accounts.spotify.com/authorize?response_type=code` + `&client_id=f51009c9ffae4a90bc7a1364f46bb2fb` + `&scope=${encodeURIComponent("user-read-private user-read-email app-remote-control")}` + `&redirect_uri=${encodeURIComponent(redirectUrl)}`
    })
    this.setState({ resultOne });
    try {
      let code = `${this.state.resultOne.params.code}`
      const returnData = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUrl,
          client_id: "f51009c9ffae4a90bc7a1364f46bb2fb",
          client_secret: "b5f81a8017144d80bc2e499b21a68e10"
        }),
      })
      this.setState({ resultTwo: returnData.data })
    } catch (error) {
      console.log("error: ", error)
    }
    console.log(this.state)
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});