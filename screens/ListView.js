import React, { useContext } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Chip } from 'react-native-elements/dist/buttons/Chip';

import ListViewItem from '../components/ListViewItem'
import { ResturantContext } from '../providers/RestaurantProvider';

export default function ListView() {

  const { restaurants } = useContext(ResturantContext)

  const renderItem = ({ item }) => <ListViewItem key={item.id} item={item}/>
  
  const renderPill = ({ item }) => <Chip title={item} containerStyle={{ marginVertical: 5, marginHorizontal: 5 }} />

  const DATA = [
    'Clear Item',
    'Halal',
    'chicken',
    'curry',
    'Fish',
    'Halal',
    'Halal',
    'Halal',
  ]
  return (
    <View style={styles.SAView}>
      <View style={{ backgroundColor: "red", width: "100%", height: 50}}>
        <FlatList data={DATA} renderItem={renderPill} horizontal={true}/>
        {/* <ButtonGroup buttons={["Closest First", "Toggle Cuisine"]} /> */}
      </View>
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