import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import css from '../app.styles';

import SignInForm from '../components/Forms/SignInForm.js';


const LoginView = ({ navigation, route }) => {
    
    let body;
    if (route.params?.post) body = route.params?.post;
    else body = "no hay posts";

    


    return (
        <View style={css.sectionContainer}>
            <Text style={css.sectionTitle}>{body}</Text>
            <SignInForm />
            <Button
                title="Go to Home... again"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default LoginView;
