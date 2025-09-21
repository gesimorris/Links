// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for a promoter (business) profile
const DUMMY_PROMOTER_DATA = {
  name: 'Jane Doe',
  businessName: 'Nightshift at 5th',
  businessBio: 'Your number one destination for nightlife in Kamloops! Offering live music, DJ sets, and special events every week.',
  profilePic: 'https://api.dicebear.com/7.x/adventurer/png?seed=Jane_Doe',
  stats: {
    totalSubscribers: 154,
    eventsHosted: 28,
    averageAttendance: 120,
    totalRevenue: '$3,080',
  },
  events: [
    { id: 'e1', title: 'DJ Babyface Performing', date: 'Dec 1, 2025' },
    { id: 'e2', title: 'TRU Cheerleading Party', date: 'Dec 8, 2025' },
    { id: 'e3', title: 'New Years Countdown', date: 'Dec 31, 2025' },
  ],
  agreements: [
    { id: 'c1', title: 'Customer Code of Conduct' },
    { id: 'c2', title: 'Subscription Terms & Conditions' },
  ],
};

const handleEditProfile = () => {
  console.log('Navigating to edit business profile...');
};

const handleViewAnalytics = () => {
  console.log('Navigating to analytics dashboard...');
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{ uri: DUMMY_PROMOTER_DATA.profilePic }}
          />
          <Text style={styles.name}>{DUMMY_PROMOTER_DATA.name}</Text>
          <Text style={styles.businessName}>{DUMMY_PROMOTER_DATA.businessName}</Text>
          <Text style={styles.bio}>{DUMMY_PROMOTER_DATA.businessBio}</Text>

          {/* New button container for promoter actions */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Business Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.rewardsButton} 
              onPress={handleViewAnalytics}
            >
              <Text style={styles.rewardsButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* New section for promoter statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics & Analytics</Text>
          <View style={styles.statRow}>
            <Ionicons name="people-outline" size={20} color="#BB86FC" />
            <Text style={styles.statText}>Total Subscribers: {DUMMY_PROMOTER_DATA.stats.totalSubscribers}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="calendar-outline" size={20} color="#BB86FC" />
            <Text style={styles.statText}>Events Hosted: {DUMMY_PROMOTER_DATA.stats.eventsHosted}</Text>
          </View>
          <View style={styles.statRow}>
            <Ionicons name="bar-chart-outline" size={20} color="#BB86FC" />
            <Text style={styles.statText}>Average Attendance: {DUMMY_PROMOTER_DATA.stats.averageAttendance}</Text>
          </View>
        </View>

        {/* Section for managing events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          {DUMMY_PROMOTER_DATA.events.map((event) => (
            <View key={event.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{event.title}</Text>
              <Text style={styles.listItemSubText}>{event.date}</Text>
            </View>
          ))}
        </View>

        {/* Section for managing customer agreements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Agreements</Text>
          {DUMMY_PROMOTER_DATA.agreements.map((agreement) => (
            <View key={agreement.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{agreement.title}</Text>
              <Ionicons name="arrow-forward" size={20} color="#E0E0E0" style={styles.agreementIcon} />
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
  businessName: {
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#BB86FC',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  editButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  rewardsButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#03DAC6', // A complementary green for rewards
    borderRadius: 20,
    marginHorizontal: 5,
  },
  rewardsButtonText: {
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
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  statText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  agreementIcon: {
    marginLeft: 'auto',
  },
  logoutContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#CF6679',
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