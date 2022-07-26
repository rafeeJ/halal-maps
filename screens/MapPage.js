import * as Location from 'expo-location';
import { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoLocationScreen from '../components/NoLocationScreen';
import { ResturantContext } from '../providers/RestaurantProvider';

export default function MapPage({ navigation }) {  
  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
  const CURRENT_LOCATION_PADDING = { top: 1000, right: 1000, bottom: 1000, left: 1000 };

  const { loading, restaurants, region } = useContext(ResturantContext)

  const mapR = useRef(null)

  const [mapsKey, setMapsKey] = useState(null)
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
    let coord = { latitude: location.coords.latitude, longitude: location.coords.longitude }
    mapR.current.fitToCoordinates([coord], { edgePadding: CURRENT_LOCATION_PADDING, animated: false })

    setCurrentLocation(coord)
  }

  useEffect(() => {
    if (points.length > 0) {
      fitAllMarkers()
    }
  }, [restaurants])

  useEffect(() => {
    setMapsKey(process.env.MAPS_API)
  }, [])

  // useEffect(() => {
  //   if (loading === false && restaurants.length > 0) {
  //     setUpMap();
  //   }
  // }, [restaurants, loading])


  return (
    <SafeAreaView style={styles.SAView}>
      {region ?
        <>
          <MapView
            maxZoomLevel={15}
            ref={mapR}
            style={styles.map}>
            {loading ?
              <></> :
              restaurants.map((restaurant, index) => {
                var lat;
                var lng;
                try {
                  lat = restaurant.geometry.location.lat
                  lng = restaurant.geometry.location.lng
                } catch (error) {
                  //
                }

                return (
                  <Marker
                    key={index}
                    coordinate={{ latitude: lat, longitude: lng }}
                    title={restaurant.name}
                    onCalloutPress={() => (navigation.navigate('Restaurant', { restaurant: restaurant }))}
                  >
                    <Icon type="feather" name='disc' color={'navy'} solid={true} />
                  </Marker>
                )
              })
            }
            {currentLocation ?
              <Marker coordinate={currentLocation} style={{ zIndex: 1000 }}>
                <Icon type="feather" name='user' color={'white'} solid={true} size={30} backgroundColor={'salmon'} borderRadius={100} />
              </Marker> : <></>
            }
          </MapView>
          <View pointerEvents='box-none' style={styles.innerView}>
            <View pointerEvents='box-none' style={styles.topBar}>

                <GooglePlacesAutocomplete
                  placeholder='Search'
                  fetchDetails={false}
                  styles={{
                    container: {
                      width: '100%'
                    }
                  }}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}
                  query={{
                    key: mapsKey,
                    language: 'en',
                    components: "country:uk"
                  }}
                />

              <FAB color={'salmon'} onPress={() => getCurrentLocation()} icon={<Icon type='feather' name='navigation' color={'white'} />} />
            </View>
          </View>
        </> :
        <NoLocationScreen />}
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
    paddingHorizontal: 10,
    display: 'flex',
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});