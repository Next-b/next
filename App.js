import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { LandingView, AccountSetupView, ConnectSpotifyView, ListeningRoomView, AuthenticateSpotifyView } from "./src/components"
import { createStackNavigator } from 'react-navigation';

const App = createStackNavigator({
  // LandingView: { screen: LandingView },
  AuthenticateSpotifyView: { screen: AuthenticateSpotifyView },
  ConnectSpotifyView: { screen: ConnectSpotifyView },
  AccountSetupView: { screen: AccountSetupView },
  ListeningRoomView: { screen: ListeningRoomView }

});

export default App;