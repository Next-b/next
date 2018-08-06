import { StyleSheet } from "react-native"
import { Constants } from 'expo';

export default StyleSheet.create({
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
    },
    text: {
        marginTop: 40,
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: 'myriadPro',
        textDecorationLine: "underline",
        textAlign: "center"

    },
    imagestyle: {
        width: 70,
        height: 70,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
    },
    text: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
        fontFamily: 'myriadPro',
        textDecorationLine: "underline"
    },
    authContainer: {
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
        textDecorationLine: "underline"
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
