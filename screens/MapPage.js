import React, { useContext } from 'react';
import { Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import ProfileButton from '../components/ProfileButton';
import { ResturantContext } from '../providers/RestaurantProvider';

export default function MapPage() {
  let tempUser = {
    name: 'Rafee Jenkins',
    initials: 'RJ',
  }

  const { restaurants } = useContext(ResturantContext)

  return (
    <SafeAreaView style={styles.SAView}>
      <MapView style={styles.map}>
        {
          restaurants.map((marker, index) => {
            return(
              <Marker 
              key={index}
              coordinate={marker.coordinate}
              title={marker.name}
              />
            )
          })
        }
      </MapView>
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