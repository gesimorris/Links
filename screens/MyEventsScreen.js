// screens/MyEventsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  bg: '#0b1220',
  surface: '#2a364a',
  card: '#1e293b',
  button: '#253046',
  text: '#e5e7eb',
  subtext: '#9ca3af',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 16;
const GAP = 20;
const CARD_RADIUS = 18;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - GAP) / 2;
const CARD_HEIGHT = 280;

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  android: { elevation: 12 },
});

// Category kept in data, not rendered on the card
const MY_EVENTS = [
  {
    id: 'me1',
    title: 'My Poker Night',
    area: 'Sahali',
    category: 'Games',
    date: 'Oct 2, 8 PM',
    image: require('../assets/images/2.png'),
  },
  {
    id: 'me2',
    title: 'Study Group – CS25',
    area: 'TRU Campus',
    category: 'Study',
    date: 'Oct 4, 6 PM',
    image: require('../assets/images/3.png'),
  },
  {
    id: 'me3',
    title: 'Open Mic I’m Hosting',
    area: 'North Shore',
    category: 'Music',
    date: 'Oct 12, 7 PM',
    image: require('../assets/images/6.png'),
  },
];

export default function MyEventsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>My Events</Text>
        <TouchableOpacity style={[styles.addBtn, shadow]} accessibilityLabel="Create Event">
          <Ionicons name="add" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingBottom: 32 }}>
        <View style={styles.grid}>
          {MY_EVENTS.map(ev => (
            <View key={ev.id} style={[styles.card, shadow]}>
              <View style={styles.imageWrap}>
                <Image source={ev.image} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
              </View>

              <Text style={styles.cardTitle} numberOfLines={1}>{ev.title}</Text>
              <Text style={styles.meta} numberOfLines={1}>{ev.area}</Text>
              {/* category intentionally hidden */}
              <Text style={styles.meta}>{ev.date}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.smallBtn}>
                  <Text style={styles.smallBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn}>
                  <Text style={styles.smallBtnText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: H_PADDING, paddingTop: 8, paddingBottom: 12,
  },
  title: { fontSize: 24, fontWeight: '600', color: COLORS.text },
  addBtn: {
    marginLeft: 'auto',
    backgroundColor: COLORS.button,
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.card,
    padding: 12,
  },
  imageWrap: {
    backgroundColor: COLORS.surface,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    height: 140,
    marginBottom: 12,
  },
  cardTitle: { fontWeight: '600', fontSize: 16, color: COLORS.text },
  meta: { color: COLORS.subtext, fontSize: 13, marginTop: 2 },
  actionsRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginTop: 16,
  },
  smallBtn: {
    backgroundColor: COLORS.button,
    paddingVertical: 5, paddingHorizontal: 10,
    borderRadius: 9999,
  },
  smallBtnText: { color: COLORS.text, fontSize: 12, fontWeight: '500' },
  deleteBtn: {
    marginLeft: 'auto',
    backgroundColor: '#b23b3b',
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
});
