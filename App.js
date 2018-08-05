
import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { AccountSetupView, ListeningRoomView, AuthenticateSpotifyView, FindCreateListeningRoomView } from "./src/components"
import { createStackNavigator } from 'react-navigation';


const App = createStackNavigator({
  AuthenticateSpotifyView: { screen: AuthenticateSpotifyView },
  AccountSetupView: { screen: AccountSetupView },
  ListeningRoomView: { screen: ListeningRoomView },
  FindCreateListeningRoomView: {screen: FindCreateListeningRoomView}                               


});

export default App;