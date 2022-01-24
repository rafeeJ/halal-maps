import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import ProfileButton from '../components/ProfileButton';
import { ResturantContext } from '../providers/RestaurantProvider';

export default function MapPage() {

  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
  
  const { loading, restaurants } = useContext(ResturantContext)
  
  const mapR = useRef(null)

  const [points, setPoints] = useState([])
  
  function fitAllMarkers() {
    var latLngs = points.map((val, idx) => {
      if (val.coords) {
        return val.coords
      }
    }).filter(p => p)
    mapR.current.fitToCoordinates(latLngs, {edgePadding: DEFAULT_PADDING, animated: true})
  }

  function setUpMap() {
    console.log("Setting up the map");
    var pointList = restaurants.map((marker, index) => {
      var point = {}
      point["title"] = marker.name
      if ("restaurantData" in marker) {
        var latlng = marker.restaurantData.geometry.location;
        var coords = {}
        coords["latitude"] = latlng.lat
        coords["longitude"] = latlng.lng
        point["coords"] = coords
      }
      return point
    })
    setPoints(pointList)
  }

  useEffect(() => {
    if (points.length > 0) {
      fitAllMarkers()
    }
  }, [points])
  
  useEffect(() => {
    if (loading == false) {
      setUpMap();
    }
  }, [loading])

  return (
    <SafeAreaView style={styles.SAView}>
      <MapView 
      ref={mapR}
      style={styles.map}>
        {loading ?
          <></> :
          points.map((point, index) => {
            return (
              <Marker
                key={index}
                coordinate={point.coords}
                title={point.title}
              />
            )
          })
        }
      </MapView>
      <View pointerEvents='box-none' style={styles.innerView}>
        <View style={styles.topBar}>
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