// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';


// export default class ConnectSpotifyView extends Component {
//     static navigationOptions = {
//         // title: 'Profile Screen',
//     };
//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View style={styles.container}>
//                 <Button
//                     title="Connect Spotify"
//                     onPress={() =>
//                         navigate('AccountSetupView', { name: 'Jane' })
//                     }
//                 />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });


import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser, Linking } from 'expo';

export default class App extends Component {
    state = {
        result: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    style={styles.paragraph}
                    title="Open WebBrowser"
                    onPress={this._handlePressButtonAsync}
                />
                <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
            </View>
        );
    }

    _handlePressButtonAsync = async () => {
        const url = 'https://accounts.spotify.com/authorize?response_type=code&client_id=f51009c9ffae4a90bc7a1364f46bb2fb&scope=' + encodeURIComponent("user-read-private user-read-email") +
            '&redirect_uri=' + encodeURIComponent("next://")
        Linking.addEventListener("next://", WebBrowser.dismissBrowser())
        let result = await WebBrowser.openBrowserAsync(url);
        this.setState({ result });
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