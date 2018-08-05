import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Constants, WebBrowser, Linking, AuthSession, Font } from 'expo';
import axios from "axios"
import { Base64 } from 'js-base64';
import { Buffer } from "buffer"
import qs from 'qs';


// import { url } from 'inspector';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false,
      resultOne: "",
      resultTwo: "",
      userData: {}
    };
    this.handlePress = this.handlePress.bind(this)
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'open-sans-bold': require('./public/MPR.ttf'),
    });
    this.setState({ fontLoaded: true })
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded && (
          <Text style={styles.text} onPress={this.handlePress} >Connect Spotify</Text>

        )}
        <Image
          source={require(`./public/audio.gif`)} style={{ resizeMode: "contain", width: 150, height: 150 }}
        />
      </View>
    );
  }
  handlePress = async () => {
    const { navigate } = this.props.navigation;
    await this.retrieveAccessToken()
    navigate('AccountSetupView', { userData: this.state.userData })
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
    await this.retrieveCurrentUser()
  };
  retrieveCurrentUser = async () => {
    try {
      const userData = await axios({
        method: "get",
        url: "https://api.spotify.com/v1/me",
        headers: {
          "Authorization": `Bearer ${this.state.resultTwo.access_token}`
        }
      })
      this.setState({ userData: userData.data })
      console.log("data on state: ", this.state.userData)
    } catch (error) {
      console.error(error)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecebe8',
  },
  button: {
    height: 50,
    borderRadius: 25,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#84bd00',
    padding: 10,
  },
  text: {
    color: "#828282",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: 'open-sans-bold',
    textDecorationLine: "underline"
  }
});