// screens/EventsScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, Platform, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// ---- Dark theme palette (lighter cards) ----
const COLORS = {
  bg:        '#0b1220',
  surface:   '#2a364a',
  card:      '#1e293b',
  button:    '#253046',
  banner:    '#1b1433',
  text:      '#e5e7eb',
  subtext:   '#9ca3af',
  icon:      '#f9fafb',
};

// Map ids -> images (require must be static in RN)
const CARD_IMAGES = {
  '1': require('../assets/images/1.png'),
  '2': require('../assets/images/2.png'),
  '3': require('../assets/images/3.png'),
  '4': require('../assets/images/4.png'),
  '5': require('../assets/images/5.png'),
  '6': require('../assets/images/6.png'),
};

const items = [
  { id: '1', place: 'Thursday Cycling Club', country: 'Aberdeen',   category: 'Sports',   date: 'Oct 3, 6 PM' },
  { id: '2', place: 'Poker Night',            country: 'Sahali',     category: 'Games',    date: 'Oct 5, 8 PM' },
  { id: '3', place: 'CS25 Study Group',       country: 'TRU Campus', category: 'Study',    date: 'Oct 4, 6 PM' },
  { id: '4', place: 'Nightshift on 5th',      country: 'Downtown',   category: 'Nightlife',date: 'Oct 7, 10 PM' },
  { id: '5', place: 'Trivia Tuesday',         country: 'Valleyview', category: 'Trivia',   date: 'Oct 8, 7 PM' },
  { id: '6', place: 'Open Mic Night',         country: 'North Shore',category: 'Music',    date: 'Oct 12, 7 PM' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 16;
const GAP = 12;
const CARD_RADIUS = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - GAP) / 2;
const CARD_HEIGHT = 200;

// Stronger shadows to pop on dark backgrounds
const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
  },
  android: { elevation: 12 },
});

export default function EventsScreen() {
  const navigation = useNavigation();

  // --- Filter state ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterType, setActiveFilterType] = useState('category'); // 'category' | 'date'
  const [filters, setFilters] = useState({ category: null, date: null });
  const [tempSel, setTempSel] = useState({ category: null, date: null });

  const categories = useMemo(
    () => Array.from(new Set(items.map(i => i.category))),
    []
  );
  const dates = useMemo(
    () => Array.from(new Set(items.map(i => i.date))),
    []
  );

  const filteredItems = useMemo(() => {
    const { category, date } = filters;
    return items.filter(it =>
      (category ? it.category === category : true) &&
      (date ? it.date === date : true)
    );
  }, [filters]);

  const openFilter = () => {
    setTempSel(filters);
    setActiveFilterType(filters.category ? 'category' : (filters.date ? 'date' : 'category'));
    setIsFilterOpen(true);
  };
  const applyFilter = () => {
    setFilters(tempSel);
    setIsFilterOpen(false);
  };
  const clearFilter = () => {
    setTempSel({ category: null, date: null });
    setFilters({ category: null, date: null });
    setIsFilterOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: COLORS.text }}>
          Explore
        </Text>
        <TouchableOpacity
          style={[
            {
              marginLeft: 'auto',
              backgroundColor: COLORS.button,
              width: 36, height: 36, borderRadius: 18,
              alignItems: 'center', justifyContent: 'center',
            },
            shadow,
          ]}
          accessibilityLabel="Search"
        >
          <Ionicons name="search" size={20} color={COLORS.icon} />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={[{ marginHorizontal: 16, marginBottom: 12, borderRadius: 24 }, shadow]}>
        <View style={{ backgroundColor: COLORS.banner, height: 190, borderRadius: 24, overflow: 'hidden' }}>
          <Image
            source={require('../assets/images/banner2.png')}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>

      {/* Section Title + Actions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.subtext }}>
          Find Clubs & Events
        </Text>

        {/* Right-side actions */}
        <TouchableOpacity
          onPress={() => navigation.navigate('MyEvents')}
          style={[
            {
              marginLeft: 'auto',
              backgroundColor: COLORS.button,
              paddingVertical: 8, paddingHorizontal: 16,
              borderRadius: 9999,
              marginRight: 8,
            },
            shadow,
          ]}
        >
          <Text style={{ color: COLORS.text, fontSize: 14, fontWeight: '500' }}>My Events</Text>
        </TouchableOpacity>

        {/* NEW: Filter button (left of Add) */}
        <TouchableOpacity
          onPress={openFilter}
          style={[
            {
              backgroundColor: COLORS.button,
              width: 36, height: 36, borderRadius: 18,
              alignItems: 'center', justifyContent: 'center',
              marginRight: 8,
            },
            shadow,
          ]}
          accessibilityLabel="Filter Events"
        >
          <Ionicons name="options-outline" size={20} color={COLORS.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              backgroundColor: COLORS.button,
              width: 36, height: 36, borderRadius: 18,
              alignItems: 'center', justifyContent: 'center',
            },
            shadow,
          ]}
          accessibilityLabel="Add Event"
        >
          <Ionicons name="add" size={22} color={COLORS.icon} />
        </TouchableOpacity>
      </View>

      {/* Active filter chip (optional visual) */}
      {(filters.category || filters.date) ? (
        <View style={{ paddingHorizontal: 16, marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {filters.category ? (
              <View style={styles.chip}>
                <Ionicons name="pricetag-outline" size={14} color={COLORS.text} />
                <Text style={styles.chipText}>{filters.category}</Text>
              </View>
            ) : null}
            {filters.date ? (
              <View style={styles.chip}>
                <Ionicons name="time-outline" size={14} color={COLORS.text} />
                <Text style={styles.chipText}>{filters.date}</Text>
              </View>
            ) : null}
            <TouchableOpacity onPress={clearFilter} style={[styles.clearChip, shadow]}>
              <Ionicons name="close" size={14} color={COLORS.text} />
              <Text style={styles.chipText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* Events Grid */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingBottom: 24 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              {
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: CARD_RADIUS,
                backgroundColor: COLORS.card,
                padding: 10,
              },
              shadow,
            ]}
          >
            <View
              style={{
                backgroundColor: COLORS.surface,
                borderRadius: CARD_RADIUS,
                overflow: 'hidden',
                height: 110,
                marginBottom: 10,
              }}
            >
              <Image
                source={CARD_IMAGES[item.id]}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            <Text style={{ fontWeight: '600', fontSize: 16, color: COLORS.text }} numberOfLines={1}>
              {item.place}
            </Text>
            <Text style={{ color: COLORS.subtext, fontSize: 12 }} numberOfLines={1}>
              {item.country}
            </Text>
            <Text style={{ color: COLORS.subtext, fontSize: 12, marginTop: 2 }} numberOfLines={1}>
              {item.category}
            </Text>
            <Text style={{ color: COLORS.subtext, fontSize: 12 }} numberOfLines={1}>
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 12 }} />}
      />

      {/* Filter Modal */}
      <Modal transparent visible={isFilterOpen} animationType="fade" onRequestClose={() => setIsFilterOpen(false)}>
        <View style={styles.overlay}>
          <View style={[styles.modalCard, shadow]}>
            <View style={styles.modalHeader}>
              <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '600' }}>Filter Events</Text>
              <TouchableOpacity onPress={() => setIsFilterOpen(false)} style={styles.iconBtn}>
                <Ionicons name="close" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Toggle between Category / Date */}
            <View style={styles.segment}>
              <TouchableOpacity
                onPress={() => setActiveFilterType('category')}
                style={[styles.segmentBtn, activeFilterType === 'category' && styles.segmentBtnActive]}
              >
                <Text style={[styles.segmentText, activeFilterType === 'category' && styles.segmentTextActive]}>Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActiveFilterType('date')}
                style={[styles.segmentBtn, activeFilterType === 'date' && styles.segmentBtnActive]}
              >
                <Text style={[styles.segmentText, activeFilterType === 'date' && styles.segmentTextActive]}>Date</Text>
              </TouchableOpacity>
            </View>

            {/* Options */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {(activeFilterType === 'category' ? categories : dates).map(opt => {
                const selected = activeFilterType === 'category'
                  ? tempSel.category === opt
                  : tempSel.date === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => {
                      if (activeFilterType === 'category') {
                        setTempSel({ category: opt, date: null }); // mutually exclusive
                      } else {
                        setTempSel({ category: null, date: opt });
                      }
                    }}
                    style={[styles.optionChip, selected && styles.optionChipActive]}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextActive]}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={clearFilter} style={[styles.actionBtn, { backgroundColor: '#394357' }]}>
                <Text style={styles.actionText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={applyFilter} style={[styles.actionBtn, { backgroundColor: COLORS.button }]}>
                <Text style={styles.actionText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  modalCard: {
    width: '100%', backgroundColor: COLORS.card, borderRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
  },
  iconBtn: {
    marginLeft: 'auto',
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.button,
  },
  segment: {
    flexDirection: 'row', backgroundColor: '#20293a',
    borderRadius: 9999, padding: 4, marginBottom: 12,
  },
  segmentBtn: { flex: 1, paddingVertical: 8, borderRadius: 9999, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: COLORS.button },
  segmentText: { color: COLORS.subtext, fontWeight: '600' },
  segmentTextActive: { color: COLORS.text },
  optionChip: {
    paddingVertical: 8, paddingHorizontal: 12,
    backgroundColor: '#20293a', borderRadius: 9999,
  },
  optionChipActive: { backgroundColor: '#3a4661' },
  optionText: { color: COLORS.subtext, fontSize: 13, fontWeight: '600' },
  optionTextActive: { color: COLORS.text },
  modalActions: {
    flexDirection: 'row', gap: 10, marginTop: 16, justifyContent: 'flex-end',
  },
  actionBtn: {
    paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10,
  },
  actionText: { color: COLORS.text, fontWeight: '600' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#20293a', paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 9999,
  },
  chipText: { color: COLORS.text, fontSize: 12, fontWeight: '600' },
  clearChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#553a3a', paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 9999, marginLeft: 6,
  },
});
