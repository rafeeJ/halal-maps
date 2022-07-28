import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, View } from 'react-native';

import { Button, Chip, Icon, Input, ListItem, Rating, Switch, Text } from 'react-native-elements';
import ListViewItem from '../components/ListViewItem';
import NoLocationScreen from '../components/NoLocationScreen';
import { ResturantContext } from '../providers/RestaurantProvider';
import FilterBar from '../components/FilterBar';

import Modal from 'react-native-modal'

export default function ListView() {

  const { restaurants, categories, region } = useContext(ResturantContext)

  const [filters, setFilters] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    if (filters) {
      console.log(`updating filter with: ${filters}`);

      let tempFilter = restaurants.filter(restaurant => restaurant.categories.includes(filters))

      setFilteredData(tempFilter)
    } else {
      setFilteredData([])
    }
  }, [filters])

  const renderItem = ({ item }) => <ListViewItem key={item.id} item={item} />

  if (region === null) {
    return (<NoLocationScreen />)
  }

  return (
    <>
      <View style={styles.SAView}>
        <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 5, marginTop: 5 }}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Search by Name' />
          </View>
          <Button icon={<Icon type="feather" name='filter' color={'black'} solid={true} />}
            buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }}
            onPress={toggleModal}
            type={'outline'}
          />
        </View>
        <FilterBar cats={categories} setState={setFilters} />
        <FlatList
          initialNumToRender={7}
          maxToRenderPerBatch={6}
          removeClippedSubviews={true}
          style={styles.list}
          data={filteredData && filteredData.length > 0 ? filteredData : restaurants}
          renderItem={renderItem}
          keyExtractor={(item, index) => index} />

      </View>
      <Modal isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection='down'
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ backgroundColor: 'white', height: Dimensions.get('screen').height / 1.5, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

          <View style={{ height: 30, paddingTop: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', marginHorizontal: 'auto' }}>
            <View style={{ backgroundColor: 'gray', height: 5, width: 30, borderRadius: 10, opacity: 50 }}></View>
          </View>

          <View style={{ paddingHorizontal: 25 }}>
            <FilterView />
            <Button title={'Apply Filters'}/>
          </View>

        </View>
      </Modal>
    </>
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

const FilterView = () => {
  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text h4>Filters</Text>
        <Button icon={<Icon type="feather" name='trash-2' color={'red'} solid={true} />} type={'clear'} />
      </View>

      <ListItem topDivider bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Fully Halal</Text>
          <Switch />
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider >
        <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Serves Alcohol</Text>
          <Switch />
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'column'}}>
          <Text style={{ textAlign: 'left', marginBottom: 5 }}>Price Level:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            <Chip title={'£'} titleStyle={{color: 'black'}} type={'outline'} buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }}/>
            <Chip title={'££'} type={'outline'} buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }}/>
            <Chip title={'£££'} type={'outline'} buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }}/>
          </View>
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'column'}}>
          <Text style={{ textAlign: 'left', marginBottom: 5 }}>Minimum Rating:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap', alignContent: 'space-between' }}>
            <Rating fractions={0} startingValue={5}/>
          </View>
        </ListItem.Content>
      </ListItem>

    </>
  )
}