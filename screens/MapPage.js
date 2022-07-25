import { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, FAB, Icon, SpeedDial, Text } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoLocationScreen from '../components/NoLocationScreen';
import { ResturantContext } from '../providers/RestaurantProvider';
import * as Location from 'expo-location';

export default function MapPage({ navigation }) {

  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
  const CURRENT_LOCATION_PADDING = { top: 1000, right: 1000, bottom: 1000, left: 1000 };

  const { loading, restaurants, region } = useContext(ResturantContext)

  const mapR = useRef(null)

  const [points, setPoints] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)

  function fitAllMarkers() {
    var latLngs = points.map((val, idx) => {
      if (val.coords) {
        return val.coords
      }
    }).filter(p => p)
    mapR.current.fitToCoordinates(latLngs, { edgePadding: DEFAULT_PADDING, animated: true })
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Setup a modal.
      return;
    }

    let location = await Location.getCurrentPositionAsync({})
    let coord = {latitude: location.coords.latitude, longitude: location.coords.longitude}
    mapR.current.fitToCoordinates([coord], {edgePadding: CURRENT_LOCATION_PADDING, animated: false})
    
    setCurrentLocation(coord)
  }

  function setUpMap() {
    console.log("Setting up the map");
    var pointList = restaurants.map((marker, index) => {
      var point = {}
      point["restaurantData"] = marker.restaurantData
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
    if (loading === false && restaurants.length > 0) {
      setUpMap();
    }
  }, [restaurants, loading])


  return (
    <SafeAreaView style={styles.SAView}>
      { region ? 
      <>
      <MapView
        maxZoomLevel={15}
        ref={mapR}
        style={styles.map}>
        {loading ?
          <></> :
          points.map((point, index) => {
            return (
              <Marker
                key={index}
                coordinate={point.coords}
                title={point.restaurantData.name}
                onCalloutPress={() => (navigation.navigate('Restaurant', { restaurant: point }))}
              >
                <Icon type="feather" name='disc' color={'navy'} solid={true} />
              </Marker>
            )
          })
        }
        { currentLocation ? 
        <Marker coordinate={currentLocation} style={{ zIndex: 1000}}>
        <Icon type="feather" name='user' color={'white'} solid={true} size={30} backgroundColor={'salmon'} borderRadius={100}/>
        </Marker> : <></>
        }
      </MapView>
      <View pointerEvents='box-none' style={styles.innerView}>
        <View style={styles.topBar}>
            <FAB color={'salmon'} onPress={() => getCurrentLocation()} icon={<Icon type='feather' name='navigation' color={'white'} />} />
        </View>
      </View>
      </> :
      <NoLocationScreen /> }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SAView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column-reverse',
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