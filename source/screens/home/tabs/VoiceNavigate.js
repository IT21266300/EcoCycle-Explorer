import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, PermissionsAndroid, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { useAppTheme } from '../../../hooks/useAppTheme';
import Typography from '../../../styles/Typography';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';


const VoiceNavigate = () => {
    const { colors } = useAppTheme();
    //   const user = useSelector((state: RootState) => state.user);

    const [location, setLocation] = useState(null);

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS permission handled via Info.plist
  };

  // Get current location
  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    fetchLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
          >
            <Marker
              coordinate={location}
              title="You are here"
              description="This is your current location"
            />
          </MapView>
        ) : null}
      </View>
    </SafeAreaView>
  );
};


export default VoiceNavigate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    textCentered: {
        textAlign: 'center',
        marginVertical: 4,
    },
    sectionHeader: {
        marginTop: 16,
        marginBottom: 8,
    },
    detailsSection: {
        marginTop: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
});