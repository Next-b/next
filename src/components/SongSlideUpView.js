import React, { Component } from "react"
import styles from "./styles"
import RowComponent from "./RowComponent"
import SearchResult from "./SearchResult"
import SortableListView from 'react-native-sortable-listview'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { FormLabel, FormInput } from "react-native-elements"
import { Text, View, TouchableHighlight, Image, TouchableOpacity, ScrollView } from 'react-native';
import Swipeout from 'react-native-swipeout';


export default class SongSlideUp extends Component {
    render() {
        return (
            <React.Fragment>
                <SortableListView
                    style={styles.lowerContainer}
                    data={this.props.data}
                    order={Object.keys(this.props.data)}
                    onRowMoved={e => {
                        Object.keys(this.props.data).splice(e.to, 0, Object.keys(this.props.data).splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row =>
                        <RowComponent data={row}
                        />}
                />
                <View style={{ flexDirection: "row", justifyContent: "flex-end", right: 15, bottom: 15, position: "absolute" }}>
                    <TouchableHighlight onPress={this.props.expand}>
                        <Image style={styles.imagestyle} source={require('./public/plus.png')} />
                    </TouchableHighlight>
                </View>
                <SlidingUpPanel
                    visible={this.props.visible}
                    allowDragging={this.props.allowDragging}
                    showBackdrop={true}
                    draggableRange={{ top: 600, bottom: 0 }}
                    onRequestClose={this.props.contract}>
                    <View style={styles.searchPanel}>
                        <View style={styles.searchPanelSuper}>
                            <TouchableOpacity onPress={this.props.contract}>
                                <FormLabel labelStyle={styles.textSmall}>Dismiss</FormLabel>
                            </TouchableOpacity>
                            <FormInput ref={input => this.input = input} inputStyle={{ height: 40, width: 160, textAlign: "center", justifyContent: 'center' }} placeholder="search..." onChangeText={((searchVal) => { this.props.updateState(searchVal), this.props.search(searchVal) })} />
                            <TouchableOpacity onPress={this.handleChange}>
                                <Text style={styles.search} >Search</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            onTouchEnd={this.props.allowDraggingFalse}
                            onTouchCancel={this.props.allowDraggingTrue}
                            onTouchStart={this.props.allowDraggingFalse}>
                            <View style={styles.searchPanelSub}>
                                {this.props.searchResult != [] && this.props.searchResult.map((result) =>
                                    (
                                        <View key={result.key} style={styles.resultView}>
                                            <SearchResult refresh={this.props.retrieveData} contract={this.props.contract} key={result.name} result={result} />
                                        </View>
                                    )
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </SlidingUpPanel>
            </React.Fragment>
        )
    }
}