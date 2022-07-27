import { useEffect } from 'react';

import Routes from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
      
  useEffect(() => {
    AsyncStorage.clear()
    console.log("cleared storage")
  }, []);

  return (
    <Routes />
  );
}
