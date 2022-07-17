import { useEffect, useState } from 'react';

import AppLoading from 'expo-app-loading';

import checkIfFirstLaunch from './config/CheckIfFirstLaunched';
import Routes from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
  const [firstLaunch, setFirstLaunch] = useState(false)
  const [loading, setLoading] = useState(true)
  
  async function check() {
    fl = await checkIfFirstLaunch()
    setFirstLaunch(fl)
    setLoading(false)
  }
  
  useEffect(() => {
    AsyncStorage.clear()
    check()
  }, []);

  if (loading) {
    return(<AppLoading />)
  }
 
  return (
    <Routes />
  );
}
