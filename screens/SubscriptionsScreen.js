// screens/SubscriptionsScreen.js (Promoter View)
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  bg: '#0b1220',
  surface: '#2a364a',
  card: '#1e293b',
  button: '#253046',
  banner: '#1b1433',
  text: '#e5e7eb',
  subtext: '#9ca3af',
  icon: '#f9fafb',
  accent: '#BB86FC',
};

const CARD_IMAGES = {
  '4': require('../assets/images/4.png'),
  '7': require('../assets/images/tru.png'),
};

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  android: { elevation: 12 },
});

// New dummy data for a promoter's promotions
const PROMOTER_PROMOTIONS = [
  {
    id: 'sub1',
    name: 'Nightshift at 5th VIP',
    price: '$20/month',
    imageKey: '4',
    subscribers: 150,
    revenue: 3000,
    redemptions: 85,
    reviews: [
      { id: 'r1', user: 'JaneD', rating: 5, comment: 'Love the free entry and the half-price drinks are a great deal!' },
      { id: 'r2', user: 'Partygoer', rating: 4, comment: 'The promotions are solid, but I wish there were more events on the calendar.' },
    ],
  },
  {
    id: 'sub2',
    name: 'TRU Campus Social',
    price: 'Free',
    imageKey: '7',
    subscribers: 850,
    revenue: 0,
    redemptions: 500,
    reviews: [
      { id: 'r3', user: 'StudentGuy', rating: 5, comment: 'The club fair was awesome! So many freebies.' },
      { id: 'r4', user: 'Newbie', rating: 3, comment: 'A little confusing to find the location sometimes. But the events are great!' },
    ],
  },
];

const PromotionCard = ({ promotion }) => (
  <View style={[styles.card, shadow]}>
    <View style={styles.imageContainer}>
      <Image
        source={CARD_IMAGES[promotion.imageKey]}
        resizeMode="cover"
        style={styles.cardImage}
      />
    </View>
    <View style={styles.content}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{promotion.name}</Text>
        <Text style={promotion.price === 'Free' ? styles.price : styles.proPrice}>{promotion.price}</Text>
      </View>

      {/* Analytics Section */}
      <View style={styles.analyticsSection}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{promotion.subscribers}</Text>
          <Text style={styles.metricLabel}>Subscribers</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>${promotion.revenue}</Text>
          <Text style={styles.metricLabel}>Revenue</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{promotion.redemptions}</Text>
          <Text style={styles.metricLabel}>Redemptions</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.editButton, shadow]}>
        <Ionicons name="create-outline" size={16} color={COLORS.text} />
        <Text style={styles.editButtonText}>Edit Promotion</Text>
      </TouchableOpacity>

      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews & Feedback</Text>
        {promotion.reviews.map(review => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.reviewUser}>{review.user}</Text>
              <View style={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons key={i} name={i < review.rating ? "star" : "star-outline"} size={12} color="#FFD700" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

export default function SubscriptionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Promotions Dashboard</Text>
          <TouchableOpacity style={[styles.addButton, shadow]}>
            <Ionicons name="add-circle-outline" size={24} color={COLORS.icon} />
          </TouchableOpacity>
        </View>
        {PROMOTER_PROMOTIONS.map(promo => (
          <PromotionCard key={promo.id} promotion={promo} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.button,
    alignItems: 'center', justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.surface,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  price: {
    fontSize: 16,
    color: COLORS.subtext,
  },
  proPrice: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  analyticsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.subtext,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.button,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  reviewsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: COLORS.subtext,
  },
  reviewItem: {
    backgroundColor: COLORS.button,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewUser: {
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewComment: {
    color: COLORS.subtext,
    marginTop: 5,
  },
});