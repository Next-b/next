import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class ConnectSpotifyView extends Component {
    static navigationOptions = {
        // title: 'Profile Screen',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Button
                    title="Connect Spotify"
                    onPress={() =>
                        navigate('AccountSetupView', { name: 'Jane' })
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});