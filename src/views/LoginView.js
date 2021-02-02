import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import css from '../app.styles';
import * as ACTIONS from '../store/actions';
import SignInForm from '../components/Forms/SignInForm.js';
import { connect } from 'react-redux';

const LoginView = ({ navigation, route }) => {
    const {addAuthUser, addToast}
    let body;
    if (route.params?.post) body = route.params?.post;
    else body = "no hay posts";

    


    return (
        <View style={css.sectionContainer}>
            <Text style={css.sectionTitle}>{body}</Text>
            <SignInForm addAuthUser={(authUser)=>{addAuthUser(authUser)}} addToast={(toast)=>addToast(toast)} />
            <Button
                title="Go to Home... again"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (session) => dispatch(ACTIONS.signIn(session)),
        addToast: (toast) => dispatch(ACTIONS.addToast(toast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

