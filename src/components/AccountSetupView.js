import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import styles from "./styles"

export default class AccountSetupView extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            photo: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
            userData: "",
            resultOne: "",
            resultTwo: ""
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        this.setState({
            name: this.props.navigation.state.params.userData.display_name,
            photo: this.props.navigation.state.params.userData.images[0].url,
            userData: this.props.navigation.state.params.userData,
            resultOne: this.props.navigation.state.params.resultOne,
            resultTwo: this.props.navigation.state.params.resultTwo
        })
        this.input.focus()
    }
    handlePress = () => {
        const { navigate } = this.props.navigation;
        console.log("Passed from SpotifyAuthentication to AccountSetup", this.props.navigation.state.params.resultTwo)
        navigate('FindCreateListeningRoomView', { userData: this.props.navigation.state.params.userData, resultTwo: this.props.navigation.state.params.resultTwo })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.authContainer}>
                    <Image style={styles.avatar}
                        source={{ uri: this.state.photo }} />
                    <FormLabel labelStyle={styles.textSmall} >Name</FormLabel>
                    <FormInput ref={input => this.input = input} inputStyle={{ textAlign: "center", justifyContent: 'center' }} defaultValue={this.state.name} />
                    < TouchableOpacity onPress={this.handlePress}>
                        <Text style={styles.text}  >Next</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.lowerContainer}>
                </View>
            </View>
        );
    }
}
