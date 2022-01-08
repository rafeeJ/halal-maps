import React, { useContext } from 'react';
import { Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ListViewItem from '../components/ListViewItem'
import { ResturantContext } from '../providers/RestaurantProvider';

export default function ListView() {

  const { restaurants } = useContext(ResturantContext)

  const renderItem = ({ item }) => <ListViewItem item={item}/>

  return (
    <SafeAreaView style={styles.SAView}>
      <FlatList data={restaurants} renderItem={renderItem} keyExtractor={item => item.id}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SAView: {
    flex: 1, 
    marginTop: StatusBar.currentHeight || 0,
  }
})