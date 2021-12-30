import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import ProfileButton from '../components/ProfileButton';

export default function MapPage() {
  let tempUser = {
    name: 'Rafee Jenkins',
    initials: 'RJ',
  }

  return (
    <SafeAreaView style={styles.SAView}>
      <MapView style={styles.map} />
      <View pointerEvents='box-none' style={styles.innerView}>
        <View style={styles.topBar}>
          <ProfileButton user={tempUser} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SAView: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  topBar: {
    alignItems: 'flex-end',
    paddingHorizontal: 10
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});