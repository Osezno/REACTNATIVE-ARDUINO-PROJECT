import React, { useEffect, useState } from 'react';

import moment from "moment";


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
    TouchableHighlight
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
    const [modalHistorial, setModalHistorial] = useState(false);
    const [timerBegin, setTimerBegin] = useState(new Date());
    const [timerOn, setTimerOn] = useState(false);
    const [historial, setHistorial] = useState([]);

    //BLUETOOTH
    const BluetoothWrite = (code) => {
        BluetoothSerial.write(code)
            .then((res) => {
                if (code == "E") {
                    setTimerOn(true);
                    setTimerBegin(Date.now());
                }
                if (code == "e") {
                    if (timerOn) {
                        const startDate = moment(timerBegin);
                        const timeEnd = moment(Date.now());
                        const diff = timeEnd.diff(startDate);
                        const diffDuration = moment.duration(diff);
                        InsertQuery(diffDuration.minutes());
                        Query();
                        setTimerOn(false);
                    }
                }
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
    //SQLQUERY

    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });

    const createTable = () => {
        db.transaction((txn) => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='rutinasCompletadas'",
                [],
                (tx, res) => {
                    if (res.rows.length == 0) {
                        create = txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS rutinasCompletadas(id INTEGER PRIMARY KEY AUTOINCREMENT, created TEXT NOT NULL, minutos INTEGER NOT NULL, tipo TEXT NOT NULL)',
                            []
                        );
                    }
                }
            );
        })
    };

    const Query = async () => {
        let selectQuery = await ExecuteQuery("SELECT * FROM rutinasCompletadas", []);
        var rows = selectQuery.rows;
        let items = [];
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            items.push(item);
        }
        setHistorial(items)
    }

    const InsertQuery = async (minutes) => {
        let current_time = moment().format("YYYY Do MM")
        let singleInsert = await ExecuteQuery("INSERT INTO rutinasCompletadas(created, minutos, tipo) VALUES (?, ?, ?)", [current_time, minutes, "Cardio"]);
    }

    // GENERAL FUNCTION

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

    const renderItem = (item) => {
        return (<View key={item.item.id} >
            { connected ?
                <Button color={"#000"} title={` Desconectar`} onPress={() => BluetoothSerial.disconnect()} />
                : <Button color={"#000"} title={` ${item.item.name} Conectar`} onPress={() => connectDevice(item.item.id)} />
            }
        </View>)
    }

    const onOffButton = (name, on, off, icon, color) => {
        return (
            <View key={on}>
                <View style={css.buttonWrap}>
                    <View style={css.titleWrap}>
                        {(name == "Ej Cardio") ?
                            <Text style={css.sectionTitle} onPress={() => setModalHistorial(true)}>{name}</Text> :
                            <Text style={css.sectionTitle}>{name}</Text>
                        }

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
            BluetoothSerial.on('readFromDevice', (data) => {

                console.log(`DATA FROM BLUETOOTH: ${data.data}`);
                console.log(data, data)
            })
            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))

        })
    }, [BluetoothSerial])

    useEffect(() => {
        BluetoothSerial.isConnected().then((res) => {
            setConnected(res)
        })
        createTable(); //readFromDevice
        Query();
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
                    <View style={css.buttonWrap} key={"?"}>
                        <View style={css.largeButton}>
                            <Button color={"#000"} title={"Cancelar"} onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalHistorial}
                onRequestClose={() => {
                    setModalHistorial(!modalHistorial);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <Text style={css.modalText}>Historial</Text>
                        {historial.map((obj) =>
                            <View style = {css.colorWrap} >
                                <Text style={css.modalText}>{obj["minutos"] + " "}</Text>
                                <Text style={css.modalText}>{obj["tipo"] + " " }</Text>
                                <Text style={css.modalText}>{obj["created"]}</Text>
                            </View>
                        )}
                    </View>
                <View style={css.buttonWrap} key={"?"}>
                    <View style={css.largeButton}>
                        <Button color={"#000"} title={"Cerrar"} onPress={() => setModalVisible(false)} />
                    </View>
                </View>
                </View>
        </Modal>
        </>
    );
};


export default HomeView;
