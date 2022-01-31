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

  function profileStack() {
    const ps = createStackNavigator()
    return (
      <ps.Navigator>
        <ps.Screen name="ProfileP" component={ProfilePage} options={{headerBackVisible: false, headerRight: close, headerLeft: false}}/>
        <ps.Screen name="Region" component={RegionPage} />
        <ps.Screen name="Login" component={LoginScreen} />
        <ps.Screen name="Signup" component={SignupScreen} />
      </ps.Navigator>
    )
  }

  function mapStack() {
    const ms = createStackNavigator()
    return (
      <ms.Navigator screenOptions={{ headerShown: false }}>
        <ms.Screen name="MapC" component={MapPage} />
        <ms.Screen name="Restaurant" component={RestaurantPage} options={{ headerShown: false }} />
      </ms.Navigator>
    )
  }

  function listStack() {
    const ls = createStackNavigator()
    return (
      <ls.Navigator screenOptions={{ headerShown: false }}>
        <ls.Screen name="ListC" component={ListView} />
        <ls.Screen name="Restaurant" component={RestaurantPage} options={{ headerShown: true }} />
      </ls.Navigator>
    )
  }

  const CreatePlaceholder = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
  );

  function mainStack() {
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
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline'
            break;
        }
      return <Icon name={iconName} color={color} size={size} type="ionicon"/>
      }, })}>
        <Tab.Screen name="Map" component={mapStack} />
        <Tab.Screen name="List" component={listStack} options={{ headerShown: true }}/>
        <Tab.Screen name="Profile" component={CreatePlaceholder} listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("ProfileP")
          }
        })} />
      </Tab.Navigator>
    );
  }

  const Navigator = useNavigation()
  useEffect(() => {

    async function check() {
      var b = await AsyncStorage.getItem("poppedUp")
      if (b == "false") {
        Navigator.navigate("ProfileP", { screen: "Signup", params: { init: true } })
        await AsyncStorage.setItem("poppedUp", "true")
      }
    }

    check()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        presentation: "modal",
        headerMode: "none",
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      })}>
        <Stack.Screen name="Main" component={mainStack} />
        <Stack.Screen name="ProfileP" component={profileStack} />
    </Stack.Navigator>
  );
}