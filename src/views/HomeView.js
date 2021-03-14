import React, { useEffect, useState } from 'react';
import { Header } from 'react-native/Libraries/NewAppScreen';

import {
    SafeAreaView,
    ScrollView,
    View,
    Button,
    Text,
    Switch,
    StatusBar,
    FlatList,
    Alert,
    Modal,
    TouchableHighlight,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'
import catalogs from '../constants/catalogs'
import style from '../app.styles';
import { useTheme } from 'react-native-paper';
import { Icon } from 'react-native-elements';
const HomeView = ({ navigation }) => {
    // USEsTATE
    const tema = useTheme();
    let css = style(tema)
    const { arduino } = catalogs;
    const { onOFF, BPM, patrones, patronesDos, modos, colorSelected, colores, colores2, colores3 } = arduino;
    const [isEnabled, setIsEnabled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [discovering, setDiscovering] = useState(false);
    const [connected, setConnected] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const BluetoothWrite = (code) => {
        BluetoothSerial.write(code)
            .then((res) => {
                console.log(res);

            })
            .catch((err) => console.log(err.message))
    }

    const colorSelect = (code) => {
        BluetoothSerial.write(code)
            .then((res) => {
                setModalVisible(true)
            })
            .catch((err) => console.log(err.message))
    }
    const colorSelection = (code) => {
        BluetoothSerial.write(code)
            .then((res) => {
                setModalVisible(false)
            })
            .catch((err) => console.log(err.message))
    }

    const connectDevice = async (id) => {
        BluetoothSerial.disconnect().then((res) => {
            BluetoothSerial.connect(id)
                .then((res) => {
                    setConnected(res)
                })
                .catch((err) => console.log(err.message))
        })
            .catch((err) => console.log(err.message))


    }


    const renderItem = (item) => {
        return (<View key={item.item.id} >
            {
                connected ?
                    <Button color={"#000"} title={` Desconectar`} onPress={() => BluetoothSerial.disconnect()} />
                    : <Button color={"#000"} title={` ${item.item.name} Conectar`} onPress={() => connectDevice(item.item.id)} />
            }

        </View>)
    }

    const onOffButton = (name, on, off, icon, color) => {
        return (
            <View key={on} >
             
                <View style={css.buttonWrap}>
                    <View style={css.titleWrap}>
                        <Text style={css.sectionTitle}>{name}</Text>
                    </View>
                    <View style={css.midButton}>
                        <Icon
                            reverse
                            name={icon}
                            type='ionicon'
                            color={color}
                            onPress={() => BluetoothWrite(on)}
                        />
                     
                    </View>
                    <View style={css.midButton}>
                        <Icon
                            reverse
                            name={icon}
                            type='ionicon'
                            color='#000'
                            onPress={() => BluetoothWrite(off)}
                        />
                       
                    </View>
                </View>
            </View>
        )
    }

    const bpmButton = (name, on, off) => {
        return (
            <View key={on} >
                <View style={css.titleWrap}>
                    <Text style={css.sectionTitle}>{name}</Text>
                </View>
                <View style={css.buttonWrap}>
                    <View style={css.rgbMidButton}>
                        <Button color={"#000"} title={`${on}`} onPress={() => BluetoothWrite(on)} />
                    </View>
                    <View style={css.rgbMidButton}>
                        <Button color={"#9d2ab9"} title={`${(off == "N") ? "NP" : off}`} onPress={() => BluetoothWrite(off)} />
                    </View>
                </View>
            </View>
        )
    }
    const patternButtons = (name, code,) => {
        return (
            <View style={css.buttonWrap} key={code}>

                <View style={css.largeButton}>
                    <Button color={code === "a" ? "#000" : "#ff1ecf"} title={`${name}`} onPress={() => BluetoothWrite(code)} />
                </View>
            </View>
        )
    }

    const toggleBluetooth = (value) => {
        if (value) {
            BluetoothSerial.enable()
                .then((res) => setIsEnabled(true))
                .catch((err) => console.log(err))
        }
        else {
            BluetoothSerial.disable()
                .then((res) => setIsEnabled(false))
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {

        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ]).then((values) => {
            setIsEnabled(values[0])
            setDevices(values[1])
        })

        BluetoothSerial.on('bluetoothEnabled', () => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                setDevices(values[1])
            })
            BluetoothSerial.on('bluetoothDisabled', () => {
                setDevices([])
            })
            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))

        })
    }, [BluetoothSerial])
    useEffect(() => {
        BluetoothSerial.isConnected().then((res) => {
            setConnected(res)
        })

    }, [BluetoothSerial, connected])
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={css.switchWrap}>
                <Text style={css.midButton}>Dispositivos Bluetooth</Text>
                <Icon
                    name='radio-outline'
                    type='ionicon'
                    color='#517fa4'
                />
                <Switch
                    style={css.midButton}
                    value={isEnabled}
                    onValueChange={(val) => toggleBluetooth(val)}
                />
            </View>
            <View>

                <FlatList
                    data={devices}
                    keyExtractor={item => item.id}
                    renderItem={(item) => renderItem(item)}
                />


            </View>
            <ScrollView>
                <SafeAreaView>
                    <View >
                        {Object.keys(onOFF).map((prop) => onOffButton(onOFF[prop][0], onOFF[prop][1], onOFF[prop][2], onOFF[prop][3], onOFF[prop][4]))}
                        {Object.keys(modos).map((prop) => onOffButton(modos[prop][0], modos[prop][1], modos[prop][2], modos[prop][3], modos[prop][4]))} 
                    </View>
                </SafeAreaView>

                <View style={css.rgbTitleWrap}>
                    <Text style={css.sectionTitleRGB}>RGB</Text>
                </View>
                <View style={css.colorWrap}>
                    {Object.keys(colorSelected).map((prop) =>
                        <View style={css.rgbMidButton} key={prop}>
                            <Button color={"#607d8b"} title={`${colorSelected[prop][0]}`} onPress={() => colorSelect(colorSelected[prop][1])} />
                        </View>

                    )}
                </View>
                {/* <Icon
                    name='g-translate'
                    color='#00aced' />

                <Icon
                    name='sc-telegram'
                    type='evilicon'
                    color='#517fa4'
                />

                <Icon
                    reverse
                    name='flower-outline'
                    type='ionicon'
                    color='#517fa4'
                /> */}
                {Object.keys(patronesDos).map((prop) => bpmButton("Repetir", patronesDos[prop][0], patronesDos[prop][1]))}
                {Object.keys(BPM).map((prop) => bpmButton("Velocidad", BPM[prop][0], BPM[prop][1]))}
                <View style={css.titleWrap}>
                    <Text style={css.sectionTitleRGB}>Secuencias</Text>
                </View>
                {Object.keys(patrones).map((prop) => patternButtons(patrones[prop][0], patrones[prop][1], true))}

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Color Seleccionado");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Elige un color</Text>
                        <View style={css.colorWrap}>
                            {Object.keys(colores).map((prop) =>
                                <View style={css.color}>
                                    <Button color={colores[prop][1]} key={prop} title={""} onPress={() => colorSelection(colores[prop][2])} />
                                </View>
                            )}
                        </View>
                        <View style={css.colorWrap}>
                            {Object.keys(colores2).map((prop) =>
                                <View style={css.color}>
                                    <Button color={colores2[prop][1]} key={prop} title={""} onPress={() => colorSelection(colores2[prop][2])} />
                                </View>
                            )}
                        </View>
                        <View style={css.colorWrap}>
                            {Object.keys(colores3).map((prop) =>
                                <View style={css.color}>
                                    <Button color={colores3[prop][1]} key={prop} title={""} onPress={() => colorSelection(colores2[prop][2])} />
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={css.buttonWrap} key={"a"}>
                        <View style={css.largeButton}>
                            <Buttoncolor={"#000"} title={"Cancelar"} onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};


export default HomeView;
