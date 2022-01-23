import React, { useContext, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';

import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function ProfilePage({ navigation }) {

  const { user, setUser } = useContext(AuthenticatedUserContext)

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null))
      } catch (error) {
        console.debug(error)
      }
    });
    return unsubAuth
  }, [])

  return (
    <>
      {user ?
        <>
          <Text>hello mr {user.displayName}</Text>
          <Button title='Logout' onPress={handleSignOut} />
          <Button title='Change Region' onPress={() => (navigation.navigate("Region", { navigation: navigation }))} />
        </>
        :
        <>
          <Text>you do not have an account</Text>
          <Button title='Login' onPress={() => (navigation.navigate("Login"))} />
          <Button title='Sign-up' onPress={() => (navigation.navigate("Signup"))} />
        </>
      }
    </>
  );
}
