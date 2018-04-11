import React, { Component } from 'react';
import { Text } from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const {email, password} = this.state;

        this.setState({ error: '', loading: true}); // this is to reset the error msg for correct sigin after wrong attempt

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {  //is from promise returned from signinMethod
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(this.onLoginFail.bind(this));
            });
              
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
      }

    onLoginSuccess() {
        this.setState({
          email: '',
          password: '',
          loading: false,
          error: ''
        });
      }

    renderButton(){
        if(this.state.loading){
            return <Spinner />
        }
        // if else can also be used ,since default else is return button keep plain
        return(
            <Button onTap={this.onButtonPress.bind(this)} >
                Log In
            </Button>
           
        )
    }
   

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="MotherTeresa@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
                
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;