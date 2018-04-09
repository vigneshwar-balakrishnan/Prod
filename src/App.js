import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import  LoginForm  from './components/LoginForm'

class App extends Component{
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyBgbj6NARdbbBLk_03zEnBjY_5-dB8XslU",
            authDomain: "authentication-8de52.firebaseapp.com",
            databaseURL: "https://authentication-8de52.firebaseio.com",
            projectId: "authentication-8de52",
            storageBucket: "authentication-8de52.appspot.com",
            messagingSenderId: "756207885495"
          })
    }
    render(){
        return(
            <View>
                <Header headerText="Auth" />
                <LoginForm />
            </View>            
        );
    }
}

export default App;