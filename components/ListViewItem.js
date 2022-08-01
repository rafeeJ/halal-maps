import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-elements';
import seedColor from 'seed-color'


export default function ListViewItem({ item }) {
  const navigation = useNavigation();

  const [color, setColor] = useState('blue')

  useEffect(() => {
    setColor(seedColor(item.categories[0]).toHex())
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Restaurant", { restaurant: item })}
    >
      <View style={{ backgroundColor: color, borderRadius: 7 }} width={Dimensions.get('screen').width * 0.2} height={'100%'}></View>
      
      <View style={{ flexGrow: 1, padding: 10}}>
        
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', flexShrink: 1, alignItems: 'center'}}>
          <Text style={{ color: 'black', marginVertical: 10}}>{item.name}</Text>
          <Text>{item.rating ? `${'\u22C5'}${'\u2605'.repeat(item.rating)}` : ''}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {
            item.categories.slice(0, 2).map((el, i) => (
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
    minWidth: 0,
    overflow: 'hidden',
    backgroundColor: 'white',

    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'gray',
    borderWidth: 0,

    marginBottom: 10
  },
  initials: {
    color: 'white'
  }
})