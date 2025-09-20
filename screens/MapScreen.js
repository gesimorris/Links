// screens/MapScreen.js
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const eventLocations = [
  {
    id: '1',
    title: 'Nightshift',
    coordinate: { latitude: 50.6750, longitude: -120.3450 }, // Downtown Kamloops
  },
  {
    id: '2',
    title: 'TRU Campus Event',
    coordinate: { latitude: 50.6725, longitude: -120.3685 }, // Near Thompson Rivers University
  },
  {
    id: '3',
    title: 'Campus Clubs Office',
    coordinate: { latitude: 50.6710, longitude: -120.3650 },
  },
];

export default function MapScreen() {
  const initialRegion = {
    latitude: 50.6718,
    longitude: -120.3429,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {eventLocations.map(event => (
          <Marker
            key={event.id}
            coordinate={event.coordinate}
            title={event.title}
            pinColor="#BB86FC"
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});