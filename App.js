import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LandingView, AccountSetupView, ConnectSpotifyView } from "./components"
import { createStackNavigator } from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: LandingView },
  AccountSetupView: { screen: AccountSetupView },
  ConnectSpotifyView: { screen: ConnectSpotifyView }
});

export default App;