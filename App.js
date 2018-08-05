import { AccountSetupView, ListeningRoomView, AuthenticateSpotifyView } from "./src/components"
import { createStackNavigator } from 'react-navigation';

const App = createStackNavigator({
  // AuthenticateSpotifyView: { screen: AuthenticateSpotifyView },
  // AccountSetupView: { screen: AccountSetupView },
  ListeningRoomView: { screen: ListeningRoomView }

});

export default App;