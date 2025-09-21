// screens/MapScreen.js
import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

// Enhanced event data with a flag for promoter's events
const eventLocations = [
  {
    id: '1',
    title: 'Nightshift at 5th',
    coordinate: { latitude: 50.6749, longitude: -120.3429 },
    address: '228 5th Ave, Kamloops, BC',
    description: 'Come dance the night away with DJ Babyface and enjoy half-price cocktails for subscribers!',
    attendees: 120,
    revenue: 650,
    isPromoterEvent: true, // This is your event
  },
  {
    id: '2',
    title: 'TRU Campus Party',
    coordinate: { latitude: 50.6725, longitude: -120.3685 },
    address: 'TRU Campus, Old Main Building',
    description: 'Annual welcome back party for all TRU students. Music, free snacks, and fun activities!',
    attendees: 210,
    isPromoterEvent: false, // This is a competitor event
  },
  {
    id: '3',
    title: 'Campus Clubs Office',
    coordinate: { latitude: 50.6710, longitude: -120.3650 },
    address: '900 McGill Rd, Kamloops, BC',
    description: 'Open mic night for all students! Sing, tell a story, or just come to support fellow students.',
    attendees: 30,
    isPromoterEvent: false,
  },
  {
    id: '4',
    title: 'Trivia Tuesday',
    coordinate: { latitude: 50.6690, longitude: -120.3340 },
    address: '150 2nd Ave, Kamloops, BC',
    description: 'Test your knowledge and win prizes with friends!',
    attendees: 15,
    revenue: 50,
    isPromoterEvent: true, // This is your event
  },
];

// New data for community-suggested events
const eventSuggestions = [
    {
        id: 's1',
        title: 'Karaoke Night',
        coordinate: { latitude: 50.6720, longitude: -120.3450 },
        suggestionDetails: 'Users are looking for a weekly karaoke spot downtown!',
    },
    {
        id: 's2',
        title: 'Community Art Workshop',
        coordinate: { latitude: 50.6780, longitude: -120.3480 },
        suggestionDetails: 'A great location for a creative painting or pottery class.',
    },
];

const hotZones = [
    {
        coordinate: { latitude: 50.6740, longitude: -120.3400 },
        radius: 400, // in meters
    },
    {
        coordinate: { latitude: 50.6710, longitude: -120.3680 },
        radius: 350,
    }
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
        {/* Render Hot Zones */}
        {hotZones.map((zone, index) => (
            <Circle
                key={index}
                center={zone.coordinate}
                radius={zone.radius}
                fillColor="rgba(187, 134, 252, 0.2)"
                strokeColor="rgba(187, 134, 252, 0.5)"
            />
        ))}

        {/* Render Event Markers */}
        {eventLocations.map(event => (
          <Marker
            key={event.id}
            coordinate={event.coordinate}
            title={event.title}
            // Change pin color for promoter's own events
            pinColor={event.isPromoterEvent ? "#03DAC6" : "#BB86FC"}
          >
            <Callout style={styles.calloutContainer}>
              <View style={styles.calloutHeader}>
                <Text style={styles.calloutTitle}>{event.title}</Text>
                {/* Show different info in the Callout for a promoter */}
                {event.isPromoterEvent ? (
                    <Text style={styles.calloutMetrics}>
                        {event.attendees} Attending • ${event.revenue}
                    </Text>
                ) : (
                    <Text style={styles.calloutAttendees}>
                        {event.attendees} Attending
                    </Text>
                )}
              </View>
              <Text style={styles.calloutAddress}>{event.address}</Text>
              <Text style={styles.calloutDescription} numberOfLines={2}>{event.description}</Text>
            </Callout>
          </Marker>
        ))}

        {/* Render Event Suggestion Markers */}
        {eventSuggestions.map(suggestion => (
            <Marker
                key={suggestion.id}
                coordinate={suggestion.coordinate}
                title={suggestion.title}
                pinColor="#FFD700" // Gold pin for suggestions
            >
                <Callout style={styles.calloutContainer}>
                    <View style={styles.calloutHeader}>
                        <Text style={styles.calloutTitle}>{suggestion.title}</Text>
                    </View>
                    <Text style={styles.calloutDescription}>{suggestion.suggestionDetails}</Text>
                </Callout>
            </Marker>
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
  calloutContainer: {
    width: 250,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  calloutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  calloutAttendees: {
    fontSize: 12,
    color: '#B0B0B0',
  },
  calloutMetrics: {
    fontSize: 12,
    color: '#03DAC6',
    fontWeight: 'bold',
  },
  calloutAddress: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 10,
  },
});