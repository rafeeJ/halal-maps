import React, { useContext, useState } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Chip } from 'react-native-elements/dist/buttons/Chip';
import FilterBar from '../components/FilterBar';

import ListViewItem from '../components/ListViewItem'
import { ResturantContext } from '../providers/RestaurantProvider';

export default function ListView() {

  const { restaurants } = useContext(ResturantContext)

  const [filters, setFilters] = useState([])

  const renderItem = ({ item }) => <ListViewItem key={item.id} item={item}/>

  return (
    <View style={styles.SAView}>
      <FilterBar setState={setFilters}/>
      <Text>Finding all restaurants with: {filters}</Text>
      <FlatList style={styles.list} data={restaurants} renderItem={renderItem} keyExtractor={item => item.id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  SAView: {
    flex: 1, 
    marginTop: StatusBar.currentHeight || 0,
  },
  list : {
    paddingHorizontal: 5  
  }
})