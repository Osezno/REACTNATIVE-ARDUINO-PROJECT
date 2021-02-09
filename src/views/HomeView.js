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
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'

import css from '../app.styles';

const HomeView = ({ navigation }) => {
    // USEsTATE
    const [isEnabled, setIsEnabled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [discovering, setDiscovering] = useState(false);
    const [connected, setConnected] = useState(false);

    const renderItem = (item) => {
        console.log(item)
        return (<View >
            <Text >{item.item.name}</Text>
        </View>)
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
            console.log(values)
            setIsEnabled(values[0])
            setDevices(values[1])
        })
        
        BluetoothSerial.on('bluetoothEnabled', () => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ]).then((values) => {
                console.log(values)
               // const [isEnabled, devices] = values
                setDevices(values[1])
            })
            
            BluetoothSerial.on('bluetoothDisabled', () => {
                setDevices([])
            })
            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))

        })
    }, [BluetoothSerial])

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                {/* <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={css.scrollView}> */}
                    <Header />
                    <Text >Bluetooth Device List</Text>
                    <View>
                        <Switch
                            value={isEnabled}
                            onValueChange={(val) => toggleBluetooth(val)}
                        />
                    </View>
                    <FlatList
                        style={{ flex: 1 }}
                        data={devices}
                        keyExtractor={item => item.id}
                        renderItem={(item) => renderItem(item)}
                    />
                    <View style={css.body}>
                        <View style={css.sectionContainer}>
                           
                            <Button
                                style={css.button}
                                title="Go to Details"
                                onPress={() => navigation.navigate('Details', { post: "holi" })}
                            />
                        </View>

                    </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        </>
    );
};


export default HomeView;
