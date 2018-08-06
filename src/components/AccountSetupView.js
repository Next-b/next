import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

export default class AccountSetupView extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            photo: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        this.setState({
            name: this.props.navigation.state.params.userData.display_name,
            photo: this.props.navigation.state.params.userData.images[0].url
        })
        this.input.focus()
    }
    handlePress = () => {
        const { navigate } = this.props.navigation;
        navigate('FindCreateListeningRoomView', {userData: this.props.navigation.state.params.userData})
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Image style={styles.avatar}
                        source={{ uri: this.state.photo }} />
                    <FormLabel labelStyle={styles.textSmall} >Name</FormLabel>
                    <FormInput ref={input => this.input = input} inputStyle={{ textAlign: "center", justifyContent: 'center' }} defaultValue={this.state.name} />
                    <Text style={styles.text} onPress={this.handlePress} >Next</Text>
                </View>
                <View style={styles.lowerContainer}>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 8 / 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lowerContainer: {
        flex: 2 / 10,
        backgroundColor: '#fff'
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "#000000",
        marginBottom: 10,
    },
    text: {
        marginTop: 20,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: 'myriadPro',
    },
    textSmall: {
        marginTop: 20,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: 'myriadPro',
        textDecorationLine: "underline"
    }
});


