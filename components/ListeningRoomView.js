import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import SortableListView from 'react-native-sortable-listview'
import RowComponent, { data } from "./RowComponent"

let order = Object.keys(data) //Array of keys


class ListeningRoom extends Component {
    constructor() {
        super()
        this.state = {
            isPlaying: true
        }
        this.changeIcon = this.changeIcon.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.previousSong = this.previousSong.bind(this)
    }
    changeIcon() {
        this.setState({ isPlaying: !this.state.isPlaying })
    }
    nextSong() {

    }
    previousSong() {

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
                    data={data}
                    order={order}
                    onRowMoved={e => {
                        order.splice(e.to, 0, order.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <RowComponent data={row} />}
                />
                <Button title="submit" style={{ alignSelf: "flex-end" }}></Button>

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