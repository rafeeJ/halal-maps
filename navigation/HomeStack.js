import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import ListView from '../screens/ListView';
import MapPage from '../screens/MapPage';
import ProfilePage from '../screens/ProfilePage';
import RestaurantPage from '../screens/RestaurantPage';
import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'
import RegionPage from '../screens/onboard/RegionPage';
import { Icon } from 'react-native-elements';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeStack() {

  function close() {
    const navigation = useNavigation()
    return <Icon name="close" type="ionicon" style={{paddingRight: 10}} onPress={() => (navigation.pop())}/>
  }

  function ProfileStack() {
    const ps = createStackNavigator()
    return (
      <ps.Navigator>
        <ps.Screen name="ProfileP" component={ProfilePage} options={{headerBackVisible: false, headerRight: close, headerLeft: false, title: 'Profile'}}/>
        <ps.Screen name="Region" component={RegionPage} />
        <ps.Screen name="Login" component={LoginScreen} />
        <ps.Screen name="Signup" component={SignupScreen} />
      </ps.Navigator>
    )
  }

  function MapStack() {
    const ms = createStackNavigator()
    return (
      <ms.Navigator screenOptions={{ 
        headerShown: false, presentation: 'modal', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, cardOverlayEnabled: true, gestureEnabled: true}}>
        <ms.Screen name="MapC" component={MapPage} options={{title: 'Map'}}/>
        <ms.Screen name="Restaurant" component={RestaurantPage} options={{ headerShown: true, headerLeft: false, headerRight: close }} />
      </ms.Navigator>
    )
  }

  function ListStack() {
    const ls = createStackNavigator()
    return (
      <ls.Navigator screenOptions={{ headerShown: true, title: 'Restaurants' }}>
        <ls.Screen name="ListC" component={ListView} />
        <ls.Screen name="Restaurant" component={RestaurantPage}/>
      </ls.Navigator>
    )
  }

  const CreatePlaceholder = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
  );

  function MainStack() {
    return (
      <Tab.Navigator 
      screenOptions={({ route }) => ({ headerShown: false, 
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Map':
            iconName = focused ? 'map' : 'map-outline'
            break;
          case 'List':
            iconName = focused ? 'list' : 'list-outline'
            break;
          case 'ProfileTab':
            iconName = focused ? 'person' : 'person-outline'
            break;
        }
      return <Icon name={iconName} color={color} size={size} type="ionicon"/>
      }, })}>
        <Tab.Screen name="Map" component={MapStack} />
        <Tab.Screen name="List" component={ListStack} options={{ headerShown: false, title: 'Restaurants' }}/>
        <Tab.Screen name="ProfileTab" options={{title: 'Profile'}} component={CreatePlaceholder} listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("ProfileStack")
          }
        })} />
      </Tab.Navigator>
    );
  }

  const Navigator = useNavigation()
  
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        presentation: "modal",
        headerMode: "none",
        gestureEnabled: true,
        cardOverlayEnabled: true,
      })}>
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} options={{title: 'Profile'}}/>
    </Stack.Navigator>
  );
}