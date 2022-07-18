import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import InputField from '../../components/InputField'
import ErrorMessage from '../../components/ErrorMessage'

import { Button, Card, Text } from 'react-native-elements';

import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [loginError, setLoginError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await auth().signInWithEmailAndPassword(email, password);
                navigation.popToTop()
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark-content' />
            <Card>
                <Card.Title>Sign into an existing account</Card.Title>
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={false}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='lock'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                value={password}
                onChangeText={text => setPassword(text)}
                handlePasswordVisibility={handlePasswordVisibility}
            />
            {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
            </Card>
            <Card>
            <Button
                onPress={() => onLogin()}
                backgroundColor='#f57c00'
                title='Login'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    marginBottom: 2
                }}
            />
            </Card>
            <Card>
            <Button
                onPress={() => navigation.replace('Signup')}
                title='Create a new account'
                color='#fff'
            />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        paddingBottom: 24
    }
});