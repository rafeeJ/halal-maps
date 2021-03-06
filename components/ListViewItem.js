import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ListViewItem(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Restaurant", {restaurant: props.item})}
    >
      <Text style={{color: 'white', marginVertical: 10}}>{props.item.name}</Text>
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