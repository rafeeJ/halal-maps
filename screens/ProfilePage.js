import React, { useContext, useEffect } from 'react';
import { AuthenticatedUserContext } from '../providers/AuthenticatedUserProvider';

import { Card, Text, Button, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import { ResturantContext } from '../providers/RestaurantProvider';

import { startCase } from 'lodash';

import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfilePage({ navigation }) {

  const { user, setUser } = useContext(AuthenticatedUserContext)
  const { region } = useContext(ResturantContext)

  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
    setUser(null)
  };

  useFocusEffect(() => {
    const unsubAuth = auth().onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null))
      } catch (error) {
        console.debug(error)
      }
    });
    return unsubAuth
  })

  return (
    <>
      <Card>
        <Card.Title>Your Details</Card.Title>
        {
          user ?
            <>
              <ListItem bottomDivider topDivider>
                <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Email:</Text>
                  <Text>{user.email}</Text>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Name:</Text>
                  <Text>{user.displayName}</Text>
                </ListItem.Content>
              </ListItem>
            </> :
            <Text h4 style={{textAlign: 'center'}}> You are not signed in!</Text>
        }
      </Card>

      <Card>
        <Card.Title>Region</Card.Title>
        <ListItem bottomDivider topDivider>
          <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Your selected region is:</Text>
            <Text>{startCase(region)}</Text>
          </ListItem.Content>
        </ListItem>
        <Button buttonStyle={{ marginTop: 10, backgroundColor: 'green' }} title='Change Region' onPress={() => (navigation.navigate("Region"))} />
      </Card>

      <Card>
        {
          user ?
            <Button buttonStyle={{ marginBottom: 6, backgroundColor: 'red' }} title='Logout' onPress={handleSignOut} /> :
            
            <View style={{ display: 'flex', justifyContent: 'center' }}>
              <Button buttonStyle={{ marginBottom: 2 }} title='Create a new account' onPress={() => (navigation.navigate("Signup"))} />
              <View style={{ display: 'flex', justifyContent: 'center' }}>
                <Text h4 style={{ textAlign: 'center' }}>Or</Text>
              </View>
              <Button buttonStyle={{ marginBottom: 2, backgroundColor: 'navy' }} title='Login' onPress={() => (navigation.navigate("Login"))} />

            </View>
        }
      </Card>


    </>
  );
}
