import { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, FAB, Icon, SpeedDial, Text } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoLocationScreen from '../components/NoLocationScreen';
import { ResturantContext } from '../providers/RestaurantProvider';

export default function MapPage({ navigation }) {

  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

  const { loading, restaurants, location } = useContext(ResturantContext)

  const mapR = useRef(null)

  const [points, setPoints] = useState([])
  const [open, setOpen] = useState(false)

  function fitAllMarkers() {
    var latLngs = points.map((val, idx) => {
      if (val.coords) {
        return val.coords
      }
    }).filter(p => p)
    mapR.current.fitToCoordinates(latLngs, { edgePadding: DEFAULT_PADDING, animated: true })
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
    if (loading == false) {
      setUpMap();
    }
  }, [restaurants, loading])


  return (
    <SafeAreaView style={styles.SAView}>
      { location ? 
      <>
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
                title={point.restaurantData.name}
                onCalloutPress={() => (navigation.navigate('Restaurant', { restaurant: point }))}
              >
                <Icon type="feather" name='disc' color={'navy'} solid={true} />
              </Marker>
            )
          })
        }
      </MapView>
      <SpeedDial isOpen={open}
        color={'salmon'}
        icon={<Icon type='feather' name='settings' color={'white'} />}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action 
        color='tomato'
        title={'Reset Zoom'} 
        icon={<Icon type='feather' name='zoom-out' color={'white'} />} 
          onPress={() => {
            setOpen(!open);
            fitAllMarkers()
          }}
        />
      </SpeedDial>
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