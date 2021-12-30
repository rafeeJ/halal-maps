import React from 'react';
import { Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ListViewItem from '../components/ListViewItem'

export default function ListView() {

  const DATA = [
    {
      id: 'IDFK',
      name: 'Gourment Borgar Kitchen',
      coordinate: {
        latitude: 1,
        longitide: 2
      }
    },
    {
      id: 'IDFK1',
      name: 'Gourment Borgar Kitchen',
      coordinate: {
        latitude: 1,
        longitide: 2
      }
    },
    {
      id: 'IDFK2',
      name: 'Gourment Borgar Kitchen',
      coordinate: {
        latitude: 1,
        longitide: 2
      }
    },
    {
      id: 'IDFK3',
      name: 'Gourment Borgar Kitchen',
      coordinate: {
        latitude: 1,
        longitide: 2
      }
    },
  ]

  const renderItem = ({ item }) => <ListViewItem item={item}/>

  return (
    <SafeAreaView style={styles.SAView}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SAView: {
    flex: 1, 
    marginTop: StatusBar.currentHeight || 0,
  }
})