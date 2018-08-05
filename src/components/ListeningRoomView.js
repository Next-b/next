import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { FormLabel, FormInput } from "react-native-elements"
import SortableListView from 'react-native-sortable-listview'
import RowComponent from "./RowComponent"
import firestore from "../../server/fireBase"
import SlidingUpPanel from 'rn-sliding-up-panel'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class ListeningRoom extends Component {
    constructor() {
        super()
        this.state = {
            data: {},
            isPlaying: true,
            visible: false,
            allowDragging: true

        }
        this.playPause = this.playPause.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.previousSong = this.previousSong.bind(this)
        this.retrieveData = this.retrieveData.bind(this)
        this.addData = this.addData.bind(this)
        this.expand = this.expand.bind(this)
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
                console.log("songVal", songVal)
                songData[song.key] = songVal
            })
            this.setState({ data: songData })
        });
    }
    addData(obj) {
        firestore.collection("songs").add(obj)
    }
    search() {

    }
    componentDidMount() {
        this.retrieveData()
        // if (this.input) {
        //     this.input.focus()
        // }
    }
    expand() {
        this.setState({ visible: true })
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
                        order.splice(e.to, 0, order.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <RowComponent data={row} />}
                />
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: 20, marginBottom: 20 }}>
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
                            <Button title='Hide' onPress={() => this.setState({ visible: false })} />
                            <FormLabel labelStyle={styles.textSmall} >Add Song</FormLabel>
                            <FormInput ref={input => this.input = input} inputStyle={{ textAlign: "center", justifyContent: 'center' }} />
                            <Text style={styles.search} onPress={this.search} >Search</Text>
                        </View>
                        <View style={styles.searchPanelSub}>
                        </View>
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
        flex: 1
    },
    imagestyle: {
        width: 70,
        height: 70,
    },
    searchPanel: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',

    },
    textSmall: {
        marginTop: 20,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: 'myriadPro',
        textDecorationLine: "underline"
    },
    search: {
        marginTop: 20,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: 'myriadPro',
    },
    searchPanelSuper: {
        flex: 2 / 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    searchPanelSub: {
        flex: 8 / 10,
        justifyContent: "flex-start"
    }


});