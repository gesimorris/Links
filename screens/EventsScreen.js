// screens/EventsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_EVENTS = [
  { id: '1', title: 'Fifa Tournament', organizer: 'Gaming Club', location: 'TRU Campus', time: 'Tonight at 8 PM' },
  { id: '2', title: 'Live Music Night', organizer: 'Nightshift', location: 'Downtown Venue', time: 'Friday at 9 PM' },
  { id: '3', title: 'Coding Workshop', organizer: 'CS Club', location: 'TRU Campus', time: 'Saturday at 2 PM' },
  { id: '4', title: 'Open Mic Night', organizer: 'Campus Clubs', location: 'Student Union', time: 'Sunday at 7 PM' },
  { id: '5', title: 'Basketball Pickup Game', organizer: 'Intramural Sports', location: 'TRU Gym', time: 'Monday at 6 PM' },
];

const EventCard = ({ event }) => (
  <TouchableOpacity style={styles.card}>
    <Text style={styles.cardTitle}>{event.title}</Text>
    <Text style={styles.cardDetails}>Organized by: {event.organizer}</Text>
    <Text style={styles.cardDetails}>Location: {event.location}</Text>
    <Text style={styles.cardDetails}>Time: {event.time}</Text>
  </TouchableOpacity>
);

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DUMMY_EVENTS}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Upcoming Events</Text>
            <TouchableOpacity style={styles.postButton}>
              <Ionicons name="add-circle" size={40} color="#BB86FC" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  listContainer: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  postButton: {
    // Add any specific button styling here
  },
});