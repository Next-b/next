import { AccountSetupView, ListeningRoomView, AuthenticateSpotifyView, FindCreateListeningRoomView, NewRoomCreateView} from "./src/components"
import { createStackNavigator } from 'react-navigation';


const App = createStackNavigator({
  AuthenticateSpotifyView: { screen: AuthenticateSpotifyView },
  AccountSetupView: { screen: AccountSetupView },
  ListeningRoomView: { screen: ListeningRoomView },
  FindCreateListeningRoomView: {screen: FindCreateListeningRoomView},                               
  NewRoomCreateView: {screen: NewRoomCreateView}

});

export default App;