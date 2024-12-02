import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapWithCurrentLocation from '../../components/MapWithCurrentLocation';

const CurrentLocationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MapWithCurrentLocation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CurrentLocationScreen;
