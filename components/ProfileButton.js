import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ProfileButton(props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={
        props.navigate ? () => props.navigate() : () => navigation.navigate('Profile')}>
      {props.user.image ?
        <Image /> :
        <Text style={styles.initials}>{props.user.initials}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: 40,
    height: 40,

    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'orange',
    borderWidth: 1
  },
  initials: {
    color: 'white'
  }
})