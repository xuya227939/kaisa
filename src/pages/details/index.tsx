import React from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    Switch,
    TouchableHighlight,
    Modal,
    Alert,
    StyleSheet,
    Image
} from 'react-native';
import { MapView } from 'react-native-amap3d';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            modalVisible: false
        };
    }

    toggleSwitch = () => {
        this.setState({ isEnabled: !this.state.isEnabled });
    };

    setModalVisible = visible => {
        this.setState({ modalVisible: visible });
    };

    render() {
        const { modalVisible } = this.state;

        return (
            <View>
                {/* <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text>{count}</Text>
                    <Button onPress={add} title="+" />
                    <Button onPress={reduce} title="-" />
                </View> */}

                <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.toggleSwitch}
                    value={this.state.isEnabled}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://sight-world.oss-cn-hangzhou.aliyuncs.com/images/logo.png'
                    }}
                />
                <MapView
                    center={{
                        latitude: 39.91095,
                        longitude: 116.37296
                    }}
                    style={{ height: 300 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    tinyLogo: {
        width: 50,
        height: 50
    }
});

export default Details;
