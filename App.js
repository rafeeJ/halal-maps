import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import checkIfFirstLaunch from './config/CheckIfFirstLaunched';
import Routes from './navigation';

export default function App() {
  
  const [firstLaunch, setFirstLaunch] = useState(false)
  
  async function check() {
    fl = await checkIfFirstLaunch()
    setFirstLaunch(fl)
  }
  
  useEffect(() => {
    check()
  }, []);

  return (
    firstLaunch ? 
    <></> :
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
