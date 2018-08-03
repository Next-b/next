import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import SortableListView from 'react-native-sortable-listview'
import RowComponent from "./RowComponent"
import firebaseApp from "../server/fireBase"
import * as firebase from 'firebase';

class ListeningRoom extends Component {
    constructor() {
        super()
        this.state = {
            data: {},
            isPlaying: true
        }
        this.changeIcon = this.changeIcon.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.previousSong = this.previousSong.bind(this)
        this.retrieveData = this.retrieveData.bind(this)
        this.itemsRef = firebaseApp.database().ref("songs")
    }
    changeIcon() {
        this.setState({ isPlaying: !this.state.isPlaying })
    }
    nextSong() {
        console.log(this.state.data)
        return
    }
    previousSong() {
        return
    }
    retrieveData(itemsRef) {
        console.log("itemsRef:", this.itemsRef)
        itemsRef.on('value', (songList) => {
            const songData = {}
            songList.forEach((song) => {
                const songVal = song.val()
                songData[song.key] = {
                    name: songVal.name,
                    artist: songVal.artist,
                    image: songVal.image,
                }
            })
            console.log("songData,", songData)
            this.setState({ data: songData })
            return songData
        }, (error) => {
            console.log(error)
        })
    }
    componentDidMount() {
        this.retrieveData(this.itemsRef)


    }
    render() {
        console.log("render triggered. state is:", this.state.data)
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
                        < TouchableOpacity onPress={this.changeIcon}>
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
    }
});