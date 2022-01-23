import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"; 
import AppLoading from 'expo-app-loading';

import checkIfFirstLaunch from './config/CheckIfFirstLaunched';
import Routes from './navigation';
import RegionPage from './screens/onboard/RegionPage';

export default function App() {
  
  const [firstLaunch, setFirstLaunch] = useState(false)
  const [loading, setLoading] = useState(true)
  
  async function check() {
    fl = await checkIfFirstLaunch()
    setFirstLaunch(fl)
    setLoading(false)
  }
  
  useEffect(() => {
    AsyncStorage.removeItem("hasLaunched")
    check()
  }, []);

  function finishOnboard() {
    setFirstLaunch(false)
  }

  return (
    loading ? <AppLoading />:
    firstLaunch ? 
    <RegionPage callback={finishOnboard}/> :
    <Routes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
