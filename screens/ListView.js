import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, View } from 'react-native';

import { Button, ButtonGroup, Chip, Icon, Input, ListItem, Rating, Switch, Text } from 'react-native-elements';
import ListViewItem from '../components/ListViewItem';
import NoLocationScreen from '../components/NoLocationScreen';
import { ResturantContext } from '../providers/RestaurantProvider';
import FilterBar from '../components/FilterBar';

import Modal from 'react-native-modal'
import TogglePill from '../components/TogglePill';

export default function ListView() {

  const { restaurants, categories, region } = useContext(ResturantContext)

  const [filters, setFilters] = useState(null)

  // This
  // var complexFiltersEG = 
  // {
  //   fullyHalal: true,
  //   servesAlcohol: false,
  //   priceLevel: 0,
  //   minRating: 0
  // }

  const [complexFilters, setComplexFilters] = useState({})

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

  useEffect(() => {
    console.log(complexFilters)
  }, [complexFilters])

  var complexFiltersEG =
  {
    fullyHalal: true,
    servesAlcohol: false,
    priceLevel: 0,
    minRating: 0
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
            <FilterView setFilters={setComplexFilters} />
            <Button title={'Apply Filters'} />
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

const FilterView = ({ setFilters }) => {

  const handleRating = (r) => {
    console.log('what the fuck');
    setRating(r)
  }

  const [halal, setHalal] = useState(null)
  const [alcohol, setAlcohol] = useState(null)
  const [rating, setRating] = useState(null)
  const [price, setPrice] = useState(null)

  const [clickedID, setClickedID] = useState(-1)


  useEffect(() => {
    setFilters({
      halal: halal,
      alcohol: alcohol,
      rating: rating,
      price: price
    })
  },
    [halal, alcohol, rating, price])

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text h4>Filters</Text>
        <Button icon={<Icon type="feather" name='trash-2' color={'red'} solid={true} />} type={'clear'} />
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
            onPress={(idx) => (setPrice(idx + 1))}
            selectedIndex={clickedID}
            buttons={['£', '££', '£££']}
            selectedButtonStyle={{ backgroundColor: 'blue' }}
          />
        </ListItem.Content>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ textAlign: 'left', marginBottom: 5 }}>Minimum Rating:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap', alignContent: 'space-between' }}>
            <Rating fractions={0} startingValue={5} onFinishRating={handleRating} />
          </View>
        </ListItem.Content>
      </ListItem>

    </>
  )
}

const PriceLevel = ({ priceCB }) => {
  const [price, setPrice] = useState(null)
  const [clickedID, setClickedID] = useState(-1)

  const handleClick = (idx) => {
    console.log(idx)
    // if (id === clickedID) {
    //   setClickedID(null)
    // } else{
    //   setClickedID(id)
    //   priceCB(id)
    // }
  }


  useEffect(() => { console.log(clickedID) }, [clickedID])

  return (
    <ButtonGroup
      onPress={handleClick}
      selectedIndex={clickedID}
      buttons={['£', '££', '£££']}
      selectedButtonStyle={{ backgroundColor: 'blue' }}
      underlayColor={'red'}
    />

    // <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>

    //   {/* <Chip onPress={handleClick} id={1} title={'£'} titleStyle={{ color: 'black' }} type={ clickedID === 1 ? 'solid' : 'outline'} buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }} />
    //   <Chip onPress={handleClick} id={2} title={'££'} titleStyle={{ color: 'black' }} type={'outline'} buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }} />
    //   <Chip onPress={handleClick} id={3} title={'£££'} titleStyle={{ color: 'black' }} type={'outline'} buttonStyle={{ marginHorizontal: 10, borderColor: 'black' }} /> */}
    // </View>
  )
}