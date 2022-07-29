import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, View } from 'react-native';

import { Button, Icon, Input, ListItem, Rating, Switch, Text } from 'react-native-elements';
import FilterBar from '../components/FilterBar';
import ListViewItem from '../components/ListViewItem';
import NoLocationScreen from '../components/NoLocationScreen';
import { ResturantContext } from '../providers/RestaurantProvider';

import { ButtonGroup } from "@rneui/themed";

import Modal from 'react-native-modal';

export default function ListView() {

  const { restaurants, categories, region } = useContext(ResturantContext)

  const [filters, setFilters] = useState(null)

  const [complexFilters, setComplexFilters] = useState(null)

  const [filteredData, setFilteredData] = useState([])

  const [searchedArray, setSearchedArray] = useState([])

  const [modalVisible, setModalVisible] = useState(false)

  const [searchString, setSearchString] = useState('')

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleTextInput = (value) => {
    setSearchString(value)
  }

  useEffect(() => {
    if (searchString !== '') {
      if (filteredData.length > 0) {
        let t = filteredData.filter(r => r.name.toLowerCase().includes(searchString.toLowerCase()))
        setSearchedArray(t)
      } else {
        let t = restaurants.filter(r => r.name.toLowerCase().includes(searchString.toLowerCase()))
        setSearchedArray(t)
      }
    } else {
      setSearchedArray([])
    }
  }, [searchString])

  useEffect(() => {
    if (filters) {
      console.log(`updating filter with: ${filters}`);

      let tempFilter = restaurants.filter(restaurant => restaurant.categories.includes(filters))

      setFilteredData(tempFilter)
    } else {
      setFilteredData([])
    }
  }, [filters])

  useEffect(() => {
    if (complexFilters) {
      
      var tempArray = restaurants.filter( r => {
        return (complexFilters.halal ? r.fullHalal === complexFilters.halal : 1) && 
               (complexFilters.alcohol ? r.servesAlcohol === complexFilters.alcohol : 1) &&
               (complexFilters.rating ? r.rating >= complexFilters.rating : 1) && 
               (complexFilters.price ? r.price_level === complexFilters.price: 1)
      })
      // Set available categories to filter here!
      setFilteredData(tempArray)
      
    } else {
      setFilteredData([])
    }
  }, [complexFilters])

  const handleApplyFilters = (filterObject) => {
    setModalVisible(false)
    setComplexFilters(filterObject)
  }

  const renderItem = ({ item }) => <ListViewItem key={item.id} item={item} />

  if (region === null) {
    return (<NoLocationScreen />)
  }

  return (
    <>
      <View style={styles.SAView}>
        <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 5, marginTop: 5 }}>
          <View style={{ flex: 1 }}>
            <Input value={searchString} placeholder='Search by Name' onChangeText={handleTextInput}/>
          </View>
          <Button icon={<Icon type="feather" name='filter' color={'black'} solid={true} />}
            buttonStyle={{ marginHorizontal: 10, borderColor: 'black', backgroundColor: complexFilters ? 'red' : 'white'}}
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
          data={searchString ? searchedArray : filteredData && filteredData.length > 0 ? filteredData : restaurants}
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
            <FilterView applyFilters={handleApplyFilters} filters={complexFilters}/>
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

const FilterView = ({ applyFilters, filters }) => {

  const handleRating = (r) => {
    setRating(r)
  }

  const [halal, setHalal] = useState(null)
  const [alcohol, setAlcohol] = useState(null)
  const [rating, setRating] = useState(null)
  const [price, setPrice] = useState(null)

  const handleApply = () => {
    let filters = {
      ...(halal && {halal: halal}),
      ...(alcohol && {alcohol: alcohol}),
      ...(rating!==null && {rating: rating}),
      ...(price!==null && {price: price})
    }

    applyFilters(filters)
  }

  const handleClear = () => {
    applyFilters(null)
    setAlcohol(null)
    setHalal(null)
    setRating(null)
    setPrice(null)
  }

  useEffect(()=>{
    console.debug('We have opened modal')
    
    if(filters) {
      setAlcohol(filters.alcohol ?? null)
      setHalal(filters.halal ?? null)
      setRating(filters.rating ?? null)
      setPrice(filters.price ?? null)
    }
  }, [])

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text h4>Filters</Text>
        <Button onPress={handleClear} icon={<Icon type="feather" name='trash-2' color={'red'} solid={true} />} type={'clear'} />
      </View>

      <ListItem topDivider bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Fully Halal</Text>
          <Switch value={halal} onValueChange={setHalal} />
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider >
        <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Serves Alcohol</Text>
          <Switch value={alcohol} onValueChange={setAlcohol} />
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ textAlign: 'left', marginBottom: 5 }}>Price Level:</Text>
          <ButtonGroup
            onPress={(idx) => {
              setPrice(idx)
            }}
            selectedIndex={price}
            buttons={['£', '££', '£££']}
          />
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ textAlign: 'left', marginBottom: 5 }}>Minimum Rating:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap', alignContent: 'space-between' }}>
            <Rating fractions={0} startingValue={5} onFinishRating={handleRating}/>
          </View>
        </ListItem.Content>
      </ListItem>
      <Button title={'Apply Filters'} onPress={handleApply}/>
    </>
  )
}