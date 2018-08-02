import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LandingView, AccountSetupView, ConnectSpotifyView, ListeningRoomView } from "./components"
import { createStackNavigator } from 'react-navigation';

const App = createStackNavigator({
  ConnectSpotifyView: { screen: ConnectSpotifyView },
  AccountSetupView: { screen: AccountSetupView },
  ListeningRoomView: { screen: ListeningRoomView }
});

export default App;