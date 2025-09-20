// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_USER_DATA = {
  name: 'John Doe',
  bio: 'Student at Thompson Rivers University. Looking for fun events!',
  profilePic: 'https://api.dicebear.com/7.x/adventurer/png?seed=John_Doe',
  subscriptions: [
    { id: 'sub1', name: 'Nightshift', type: 'Venue' },
    { id: 'sub2', name: 'Campus Clubs', type: 'Organization' },
  ],
  pastEvents: [
    { id: 'e1', title: 'TRU Orientation', date: 'Sep 5, 2025' },
    { id: 'e2', title: 'Nightshift Welcome Party', date: 'Sep 10, 2025' },
    { id: 'e3', title: 'First Club Meeting', date: 'Sep 15, 2025' },
  ],
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{ uri: DUMMY_USER_DATA.profilePic }}
          />
          <Text style={styles.name}>{DUMMY_USER_DATA.name}</Text>
          <Text style={styles.university}>Thompson Rivers University</Text>
          <Text style={styles.bio}>{DUMMY_USER_DATA.bio}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Subscriptions</Text>
          {DUMMY_USER_DATA.subscriptions.map((sub) => (
            <View key={sub.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{sub.name}</Text>
              <Text style={styles.listItemSubText}>{sub.type}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          {DUMMY_USER_DATA.pastEvents.map((event) => (
            <View key={event.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{event.title}</Text>
              <Text style={styles.listItemSubText}>{event.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  university: {
    fontSize: 16,
    color: '#BB86FC',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    marginTop: 5,
  },
  editButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#BB86FC',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  section: {
    marginTop: 15,
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 10,
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  listItemText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  listItemSubText: {
    fontSize: 12,
    color: '#B0B0B0',
    marginTop: 2,
  },
  logoutContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#CF6679', // A soft red for a dark theme
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
});