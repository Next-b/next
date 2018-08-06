import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TouchableOpacity, Animated, ScrollView, TextInput, Keyboard } from 'react-native';
import { FormLabel, FormInput, Input } from "react-native-elements"
import SortableListView from 'react-native-sortable-listview'
import RowComponent from "./RowComponent"
import firestore from "../../server/fireBase"
import SlidingUpPanel from 'rn-sliding-up-panel'
import qs from 'qs';
import axios from "axios"
import SearchResult from "./SearchResult"

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
            resultTwo: ""
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
    }
    static navigationOptions = {
        headerLeft: null
    };
    playPause() {
        //trigger play song in spotify api
        this.setState({ isPlaying: !this.state.isPlaying })
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
        Keyboard.dismiss()
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
            console.log(arr)
            this.setState({ searchResult: arr })

            console.log(searchResult.data.tracks.items[0].name + " by " + searchResult.data.tracks.items[0].artists[0].name)

        } catch (error) {
            console.log("big bad error:", error)
        }
    }
    componentDidMount() {
        this.retrieveData()
        this.setState({
            userData: this.props.navigation.state.params.userData,
            resultOne: this.props.navigation.state.params.resultOne,
            resultTwo: this.props.navigation.state.params.resultTwo
        })
    }
    handleChange() {
        this.search(this.state.searchVal)
        console.log("value to search:", this.state.searchVal)
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
            <React.Fragment>
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
                <SortableListView
                    style={styles.lowerContainer}
                    data={this.state.data}
                    order={Object.keys(this.state.data)}
                    onRowMoved={e => {
                        Object.keys(this.state.data).splice(e.to, 0, Object.keys(this.state.data).splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <RowComponent data={row} />}
                />
                <View style={{ flexDirection: "row", justifyContent: "flex-end", right: 15, bottom: 15, position: "absolute" }}>
                    <TouchableHighlight onPress={this.expand}>
                        <Image style={styles.imagestyle} source={require('./public/plus.png')} />
                    </TouchableHighlight>
                </View>

                <SlidingUpPanel
                    visible={this.state.visible}
                    allowDragging={this.state.allowDragging}
                    showBackdrop={true}
                    draggableRange={{ top: 600, bottom: 0 }}
                    onRequestClose={() => this.setState({ visible: false })}>

                    <View style={styles.searchPanel}>
                        <View style={styles.searchPanelSuper}>
                            <Text labelStyle={styles.textSmall} onPress={() => this.setState({ visible: false })} >Dismiss</Text>
                            <FormInput inputStyle={{ height: 40, width: 160, textAlign: "center", justifyContent: 'center' }} placeholder="search..." onChangeText={((searchVal) => this.setState({ searchVal }))} onSubmitEditing={() => this.search(this.state.searchVal)} />
                            <Text style={styles.search} onPress={this.handleChange}>Search</Text>
                        </View>
                        {this.state.searchResult == [] && <Image style={styles.lowerContainer} source={require('./public/original.gif')} />}
                        <ScrollView
                            onTouchEnd={() => this.setState({ allowDragging: true })}
                            onTouchCancel={() => this.setState({ allowDragging: true })}
                            onTouchStart={() => this.setState({ allowDragging: false })}>
                            <View style={styles.searchPanelSub}>
                                {this.state.searchResult != [] && this.state.searchResult.map((result) =>
                                    (
                                        <View key={result.key} style={styles.resultView}>
                                            <SearchResult refresh={this.retrieveData} contract={this.contract} key={result.name} result={result} />
                                        </View>
                                    )
                                )}

                            </View>
                        </ScrollView>

                    </View>




                </SlidingUpPanel>
            </React.Fragment >
        )
    }
}

export default ListeningRoom

const styles = StyleSheet.create({
    upperContainer: {
        flex: 1 / 5,
        backgroundColor: '#fff',
    },
    upperContainerSubContainer: {
        flex: 1 / 2, flexDirection: "row", justifyContent: "flex-end"
    },
    upperContainerSuperContainer: {
        flex: 1 / 2, justifyContent: "flex-start"
    },
    lowerContainer: {
        flex: 1,
    },
    imagestyle: {
        width: 70,
        height: 70,

    },
    searchPanel: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    textSmall: {
        marginTop: 20,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: 'myriadPro',
    },
    search: {
        marginTop: 12,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: 'myriadPro',
        textDecorationLine: "underline"

    },
    searchPanelSuper: {
        flex: 3 / 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchPanelSub: {
        flex: 7 / 10,
        flexDirection: "column"
    },
    resultView: {
        flex: 1
    }
});