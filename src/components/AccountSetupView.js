import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class AccountSetupView extends Component {
    constructor() {
        super()
        this.state = {
            fontLoaded: false,
            name: "",
            photo: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        }
    }
    static navigationOptions = {
        title: 'set up your account',
    };
    componentDidMount() {
        console.log("the state:", this.props.navigation.state)
        this.setState({
            name: this.props.navigation.state.params.userData.display_name,
            photo: this.props.navigation.state.params.userData.images[0].url
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image style={styles.avatar}
                    source={{ uri: this.state.photo }} />
                <FormLabel>Name</FormLabel>
                <FormInput style={{ textAlign: "center", justifyContent: 'center', autoFocus: "true" }} defaultValue={this.state.name} />
                <Button
                    title="Next"
                    onPress={() =>
                        navigate('FindCreateListeningRoomView', { name: 'Jane' })
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
        marginTop: 40
        // justifyContent: 'center',
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


