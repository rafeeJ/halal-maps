import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Chip } from 'react-native-elements/dist/buttons/Chip';
import FilterBar from '../components/FilterBar';

import ListViewItem from '../components/ListViewItem'
import { ResturantContext } from '../providers/RestaurantProvider';

export default function ListView() {

  const { restaurants, categories } = useContext(ResturantContext)

  const [filters, setFilters] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (filters.length > 0) {
      console.log(`updating filter with: ${filters}`);

      let tempFilter = restaurants.filter(function (data) {
        let toFilter = false
        let curF = filters[0]
        
        if ("zabData" in data) {
          if (data.zabData.categories.includes(curF)) {
            toFilter = true
          }
        }

        if ("uberData" in data) {
          if (data.uberData.categories.includes(curF)) {
            toFilter = true
          }
        }

        return toFilter
      })

      setFilteredData(tempFilter)
    } else {
      setFilteredData([])
    }
  }, [filters])

  const renderItem = ({ item }) => <ListViewItem key={item.id} item={item} />

  return (
    <View style={styles.SAView}>
      <FilterBar cats={categories} setState={setFilters} />
      <FlatList 
      initialNumToRender={7}
      maxToRenderPerBatch={6}
      removeClippedSubviews={true}
      style={styles.list} 
      data={filteredData && filteredData.length > 0 ? filteredData : restaurants} 
      renderItem={renderItem} 
      keyExtractor={item => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  SAView: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  list: {
    paddingHorizontal: 5
  }
})