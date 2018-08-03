import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class AccountSetupView extends Component {
    static navigationOptions = {
        title: 'set up your account',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image style={styles.avatar}
                    source={{ uri: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/30594643_1789577784427986_7750358027110187008_o.jpg?_nc_cat=0&oh=306810fefa19f3e4ec80b05ff0b42e7a&oe=5C0B16C0' }} />
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={() => console.log("beans")} />
                {/* <FormValidationMessage>Error message</FormValidationMessage> */}
                <Button
                    title="Next"
                    onPress={() =>
                        navigate('ListeningRoomView', { name: 'Jane' })
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
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
});


