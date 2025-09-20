// screens/SubscriptionsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const DUMMY_SUBSCRIPTIONS = [
  {
    id: 'sub1',
    name: 'Nightshift at 5th',
    price: '$20/month',
    isPro: true,
    events: [
      { id: 'e1', title: 'DJ Set: Techno Night', date: 'Dec 1, 9 PM' },
      { id: 'e2', title: 'Live Music: Indie Rock', date: 'Dec 8, 10 PM' },
    ],
    promotions: [
      { id: 'p1', title: 'Free entry for subscribers', description: 'Show your sub status at the door.' },
      { id: 'p2', title: 'Half-price cocktails', description: 'Redeem at the bar with QR code.' },
    ],
    rewards: {
      totalDrinksBought: 12,
      redeemedPoints: 100, // Example of redeemed points
      currentPoints: 25, // Example of current points
    }
  },
  {
    id: 'sub2',
    name: 'Campus Clubs',
    price: 'Free',
    isPro: false,
    events: [
      { id: 'e3', title: 'Annual Club Fair', date: 'Dec 5, 6 PM' },
      { id: 'e4', title: 'Holiday Mixer', date: 'Dec 12, 5 PM' },
    ],
    promotions: [
      { id: 'p3', title: 'Free club t-shirt' },
    ],
  },
];

const SubscriptionCard = ({ subscription }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{subscription.name}</Text>
      <Text style={subscription.isPro ? styles.proPrice : styles.price}>{subscription.price}</Text>
    </View>

    {subscription.rewards && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Rewards</Text>
        <Text style={styles.rewardText}>Current Points: {subscription.rewards.currentPoints}</Text>
        <Text style={styles.rewardText}>Redeemed Points: {subscription.rewards.redeemedPoints}</Text>
      </View>
    )}

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      {subscription.events.map(event => (
        <Text key={event.id} style={styles.itemText}>- {event.title} on {event.date}</Text>
      ))}
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Exclusive Promotions</Text>
      {subscription.promotions.map(promo => (
        <View key={promo.id} style={styles.promotionItem}>
          <Text style={styles.itemText}>{promo.title}</Text>
          <Text style={styles.promotionDescription}>{promo.description}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default function SubscriptionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>My Subscriptions</Text>
        {DUMMY_SUBSCRIPTIONS.map(sub => (
          <SubscriptionCard key={sub.id} subscription={sub} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  price: {
    fontSize: 16,
    color: '#B0B0B0',
  },
  proPrice: {
    fontSize: 16,
    color: '#BB86FC',
    fontWeight: 'bold',
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#E0E0E0',
  },
  itemText: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 3,
  },
  promotionItem: {
    marginBottom: 10,
  },
  promotionDescription: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  rewardText: {
    fontSize: 14,
    color: '#BB86FC',
    marginBottom: 3,
  },
});