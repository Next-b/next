import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import SortableListView from 'react-native-sortable-listview'


let data = {
    1: { name: "Mardy Bum", artists: "Arctic Monkeys", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Whatever_People_Say_I_Am%2C_That%27s_What_I%27m_Not.jpg/220px-Whatever_People_Say_I_Am%2C_That%27s_What_I%27m_Not.jpg" },
    2: { name: "God Moving Over the Face of the Waters", artists: "Moby", image: "https://img.discogs.com/OzVK-nDtkkC76pP9uQSgeCumFH4=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-146990-1405843115-8919.jpeg.jpg" },
    3: { name: "Bad Bitches Only", artists: "Migos", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Culture_II.png/220px-Culture_II.png" },
    4: { name: "What You Know", artists: "Two Door Cinema Club", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Two_Door_Cinema_Club_-_Tourist_History.png/220px-Two_Door_Cinema_Club_-_Tourist_History.png" },
    5: { name: "Mona Lisa", artists: "Toro Y Moi", image: "https://d3c1jucybpy4ua.cloudfront.net/data/54582/big_picture/toro_y_moi_boo_boo_01.jpg?1499894696" }
}

let order = Object.keys(data) //Array of keys

class RowComponent extends Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={{
                    padding: 0,
                    backgroundColor: '#F8F8F8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                }}
                {...this.props.sortHandlers}
            >
                <View style={{ flex: 1, flexDirection: "row", padding: 10, alignItems: "center" }}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={{ uri: this.props.data.image }}
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <Text>{this.props.data.artists} </Text><Text>{this.props.data.name} </Text>
                    </View>
                </View>
            </TouchableHighlight >
        )
    }
}

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
                <View style={{ flex: 1 / 4, flexDirection: "row" }}>
                    <View style={{
                        flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"
                    }}>
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
                    style={{ flex: 1 }}
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});