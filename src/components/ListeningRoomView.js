import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from "../../server/fireBase"
import axios from "axios"
import styles from "./styles"
import SongSlideUp from "./SongSlideUpView"



class ListeningRoom extends Component {
    constructor() {
        super()
        this.state = {
            data: {},
            isPlaying: true,
            visible: false,
            allowDragging: true,
            searchResult: [],
            searchVal: "",
            userData: "",
            resultOne: "",
            resultTwo: "",
            loading: true
        }
        this.playPause = this.playPause.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.previousSong = this.previousSong.bind(this)
        this.retrieveData = this.retrieveData.bind(this)
        this.addData = this.addData.bind(this)
        this.expand = this.expand.bind(this)
        this.search = this.search.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.contract = this.contract.bind(this)
        this.updateState = this.updateState.bind(this)
        this.allowDraggingFalse = this.allowDraggingFalse.bind(this)
    }
    static navigationOptions = {
    };
    playPause() {
        //trigger play song in spotify api
        this.setState({ isPlaying: !this.state.isPlaying })
    }
    updateState(searchVal) {
        this.setState({ searchVal })
    }
    allowDraggingFalse() {
        this.setState({ allowDragging: false })
    }
    allowDraggingTrue() {
        this.setState({ allowDragging: true })
    }
    nextSong() {
        //sends song data to spotify api
        return
    }
    previousSong() {
        //sends song data to spotify api
        return
    }
    retrieveData() {
        firestore.collection("songs").get().then((songList) => {
            const songData = {}
            songList.forEach((song) => {

                const songVal = song.data()
                songData[song.id] = songVal
            })
            this.setState({ data: songData })
        });
    }
    addData(obj) {
        firestore.collection("songs").add(obj)
    }
    search = async (trackName) => {
        // Keyboard.dismiss()
        try {
            const token = this.props.navigation.state.params.resultTwo.access_token
            const searchResult = await axios({
                method: "get",
                url: `https://api.spotify.com/v1/search?q=${trackName}&limit=10&type=track`,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const arr = []
            searchResult.data.tracks.items.forEach((result) => {
                const obj = {}
                var ct = 0
                obj[ct] = {
                    artist: result.artists[0].name,
                    image: result.album.images[0].url,
                    name: result.name
                }
                arr.push(obj)
                ct++
            })
            this.setState({ searchResult: arr })
        } catch (error) {
            console.log("big bad error:", error)
        }
    }
    componentDidMount() {
        console.log("Passed from FindCreateListeningRoom to ListeningRoom", this.props.navigation.state.params.resultTwo)
        this.retrieveData()
        this.setState({
            userData: this.props.navigation.state.params.userData,
            resultOne: this.props.navigation.state.params.resultOne,
            resultTwo: this.props.navigation.state.params.resultTwo
        })
        setTimeout(() => this.setState({ loading: false }), 1000);
    }
    handleChange() {
        this.search(this.state.searchVal)
        console.log("pressed!")
    }
    expand() {
        this.setState({ visible: true })
    }
    contract() {
        this.setState({ visible: false })
    }
    render() {
        return (
            <View style={{ backgroundColor: "#fff", flex: 1 }} >
                <View style={styles.upperContainer}>
                    <View style={styles.upperContainerSuperContainer}>
                    </View>
                    <View style={styles.upperContainerSubContainer}>
                        <Text>Current Artist</Text>
                        < TouchableOpacity onPress={this.previousSong}>
                            <Image
                                source={require(`./public/previous.png`)} style={{ width: 60, height: 60 }}
                            />
                        </TouchableOpacity>
                        < TouchableOpacity onPress={this.playPause}>
                            <Image
                                source={this.state.isPlaying ? require(`./public/play.png`) : require(`./public/pause.png`)} style={{ width: 60, height: 60 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.nextSong}>
                            <Image
                                source={require(`./public/next.png`)} style={{ width: 60, height: 60 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View >
                {this.state.loading ? (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color="#000000" />
                        <Image style={{ resizeMode: "contain" }} source={require('./public/original.gif')} />
                    </View>
                ) : (
                        <SongSlideUp contract={this.contract} retrieveData={this.retrieveData} searchResult={this.state.searchResult} data={this.state.data} expand={this.expand} visible={this.state.visible} allowDragging={this.state.allowDragging} contract={this.contract} updateState={this.updateState} search={this.search} handleChange={this.handleChange} />
                    )
                }

            </View >
        )
    }
}

export default ListeningRoom
