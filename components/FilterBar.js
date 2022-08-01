import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-elements';
import TogglePill from './TogglePill';


export default function FilterBar({ setState, cats }) {
  useEffect(() => {
  }, [])
  
  const [clickedID, setClickedID] = useState(-1)

  const handleClick = (title, id) => {
    console.log(`Updating with ${title}, ${id}`);
    if (id === clickedID) {
      handleClear()
    } else {
      setState(title)
      setClickedID(id)
    }
  }
  
  const handleClear = () => {
    console.log(`Clearing filters`);
    setState(null)
    setClickedID(-1)
  }

  const renderPill = ({ item, index }) => 
  <TogglePill id={index} toggled={ clickedID === index ? true : false} title={`${item[0]}`} callback={handleClick}/>

  return (
    <View
      style={styles.container}
    >
      <Chip buttonStyle={{backgroundColor: 'red'}} title={"Clear"} onPress={() => handleClear()}/>
      <FlatList keyExtractor={(item, index) => index} showsHorizontalScrollIndicator={false} data={cats} renderItem={renderPill} horizontal={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 5,
    paddingBottom: 10,

  },
  initials: {
    color: 'white'
  }
})