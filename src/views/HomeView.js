import React from 'react';
import { Header } from 'react-native/Libraries/NewAppScreen';

import {
    SafeAreaView,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
} from 'react-native';

import css from '../app.styles';

const HomeView = ({ navigation }) => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={css.scrollView}>
                    <Header />
                    {global.HermesInternal == null ? null : (
                        <View style={css.engine}>
                            <Text style={css.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={css.body}>
                        <View style={css.sectionContainer}>
                            <Text style={css.sectionTitle}>oseznos first App</Text>
                            <Button
                                style={css.button}
                                title="Go to Details"
                                onPress={() => navigation.navigate('Details', { post: "holi" })}
                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default HomeView;
