import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-elements';


export default function ListViewItem(props) {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const x = ['Halal', '$', '$$', '$$$', 'Vegan', 'Vegetarian']
    var cats = 'uberData' in props.item ? props.item.uberData.categories : props.item.zabData.categories
    var cats = cats.filter(el => !x.includes(el))
    setCategories(cats.slice(0, 2))
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Restaurant", { restaurant: props.item })}
    >
      <View style={{ backgroundColor: 'blue', borderRadius: 8}} width={50} height={'100%'}></View>
      <View style={{flexGrow: 5, padding: 10 }}>
        <Text style={{ color: 'white', marginVertical: 10 }}>{props.item.restaurantData.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            categories.map((el, i) => (
              <Chip title={el} containerStyle={{ marginVertical: 5, marginHorizontal: 5 }} key={i} />
            ))
          }
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',

    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'orange',
    borderWidth: 1,

    marginBottom: 10
  },
  initials: {
    color: 'white'
  }
})