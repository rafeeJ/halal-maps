import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button as RNButton } from 'react-native';

import AuthButton from '../../components/AuthButton'
import InputField from '../../components/InputField'
import ErrorMessage from '../../components/ErrorMessage'

import Firebase from '../../config/firebase';
import { Button, Card, Text } from 'react-native-elements';

const auth = Firebase.auth();

export default function SignupScreen({ route, navigation }, props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');
  const [name, setName] = useState('');
  const [init, setInit] = useState(false)

  useEffect(() => {
    try {
      setInit(route.params.init)
    } catch (e) {
      console.debug("No init")
    }
  }, [])

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
        await auth.currentUser.updateProfile({
          displayName: name
        })
        init ? navigation.navigate("Map") : navigation.popToTop()
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Card>
        <Card.Title>Create new account</Card.Title>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='account'
        placeholder='Enter your name'
        autoCapitalize='none'
        keyboardType='default'
        textContentType='name'
        autoFocus={false}
        value={name}
        onChangeText={text => setName(text)}
      />
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
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      </Card>
      <Card>
        <View>
      <Button
        onPress={() => onHandleSignup()}
        backgroundColor='#f57c00'
        title='Complete Signup'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 2
        }}
      />
      {/* <View style={{ display: 'flex', justifyContent: 'center' }}>
                <Text h4 style={{ textAlign: 'center' }}>Or</Text>
              </View>
      <Button
        onPress={() => navigation.replace('Login')}
        title='Go to Login'
        color='#fff'
      /> */}
      </View>
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