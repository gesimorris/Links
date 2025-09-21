// screens/EventsScreen.js (Promoter View)
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, Platform, Modal, StyleSheet, TextInput, Switch, Linking, ScrollView } from 'react-native';
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
  accent:    '#BB86FC',
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

// Reverted to original events, with new promoter data added
const items = [
  { id: '1', place: 'Thursday Cycling Club', country: 'Aberdeen', category: 'Sports', date: 'Oct 3, 6 PM', attendees: 25, revenue: 0, isPrivate: false },
  { id: '2', place: 'Poker Night', country: 'Sahali', category: 'Games', date: 'Oct 4, 8 PM', attendees: 12, revenue: 100, isPrivate: true },
  { id: '3', place: 'CS25 Study Group', country: 'TRU Campus', category: 'Study', date: 'Oct 5, 6 PM', attendees: 8, revenue: 0, isPrivate: false },
  { id: '4', place: 'Nightshift on 5th', country: 'Downtown', category: 'Nightlife', date: 'Oct 7, 10 PM', attendees: 120, revenue: 650, isPrivate: false },
  { id: '5', place: 'Trivia Tuesday', country: 'Valleyview', category: 'Trivia', date: 'Oct 8, 7 PM', attendees: 30, revenue: 50, isPrivate: false },
  { id: '6', place: 'Open Mic Night', country: 'North Shore', category: 'Music', date: 'Oct 12, 7 PM', attendees: 45, revenue: 0, isPrivate: false },
];

const DUMMY_COMMENTS = [
  { id: 'c1', user: 'JaneD', text: 'Great crowd! Music was awesome.' },
  { id: 'c2', user: 'CoolGuy', text: 'Had a fantastic time, will be back for sure.' },
  { id: 'c3', user: 'Partygoer', text: 'Venue was a bit crowded, but loved the vibe!' },
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
  
  // --- Add Event state ---
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    description: '',
    isPrivate: false,
  });

  // --- New state for event details modal ---
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openAddEvent = () => setIsAddEventOpen(true);
  const closeAddEvent = () => {
    setIsAddEventOpen(false);
    // Reset the form
    setNewEvent({
      name: '',
      location: '',
      description: '',
      isPrivate: false,
    });
  };
  const handleAddEvent = () => {
    // This is where you'd send the data to your backend
    console.log("Adding event:", newEvent);
    closeAddEvent();
  };
  const handleUploadAgreement = () => {
    // Logic to open a file picker and upload a document
    console.log("Uploading customer agreement form...");
  };

  // --- New handler to open the event details modal ---
  const handleOpenEventDetails = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };
  const handleCloseEventDetails = () => {
    setIsEventDetailsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={{ fontSize: 22, fontWeight: '600', color: COLORS.text }}>
          Promoter Dashboard
        </Text>
        <TouchableOpacity
          onPress={openAddEvent}
          style={[
            {
              marginLeft: 'auto',
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

      {/* Section Title */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.subtext }}>
          Your Events
        </Text>
      </View>

      {/* Promoter's Events Grid */}
      <FlatList
        data={items}
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
            onPress={() => handleOpenEventDetails(item)}
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
            <View style={{ marginTop: 4 }}>
                <Text style={{ color: COLORS.subtext, fontSize: 12 }}>
                    <Ionicons name="people" size={12} color={COLORS.subtext} /> {item.attendees} Attending
                </Text>
                <Text style={{ color: COLORS.subtext, fontSize: 12 }}>
                    <Ionicons name="cash" size={12} color={COLORS.subtext} /> ${item.revenue} Revenue
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.scanQrButton}
            >
                <Ionicons name="qr-code-outline" size={16} color={COLORS.text} />
                <Text style={styles.scanQrText}>Scan QR</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Add Event Modal */}
      <Modal transparent visible={isAddEventOpen} animationType="fade" onRequestClose={closeAddEvent}>
        <View style={styles.overlay}>
          <ScrollView style={[styles.modalCard, shadow]}>
            <View style={styles.modalHeader}>
              <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '600' }}>Add a New Event</Text>
              <TouchableOpacity onPress={closeAddEvent} style={styles.iconBtn}>
                <Ionicons name="close" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Image Placeholder */}
            <TouchableOpacity style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={40} color={COLORS.subtext} />
              <Text style={styles.imagePlaceholderText}>Add Event Image</Text>
            </TouchableOpacity>
            
            {/* NEW: Customer Agreement Form Upload */}
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadAgreement}>
                <Ionicons name="document-text-outline" size={20} color={COLORS.text} />
                <Text style={styles.uploadButtonText}>Upload Customer Agreement Form</Text>
            </TouchableOpacity>

            {/* Form Inputs */}
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              placeholderTextColor={COLORS.subtext}
              value={newEvent.name}
              onChangeText={(text) => setNewEvent({ ...newEvent, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor={COLORS.subtext}
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Brief Description of Activity"
              placeholderTextColor={COLORS.subtext}
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
              multiline
              numberOfLines={4}
            />

            {/* Other Important Info */}
            <TextInput
              style={styles.input}
              placeholder="Date (e.g., Oct 25, 2025)"
              placeholderTextColor={COLORS.subtext}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 7 PM - 9 PM)"
              placeholderTextColor={COLORS.subtext}
            />
            <TextInput
              style={styles.input}
              placeholder="Category (e.g., Sports, Music, Study)"
              placeholderTextColor={COLORS.subtext}
            />

            {/* Public/Private Toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>Private Event?</Text>
              <Switch
                trackColor={{ false: '#767577', true: COLORS.accent }}
                thumbColor={newEvent.isPrivate ? COLORS.text : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNewEvent({ ...newEvent, isPrivate: !newEvent.isPrivate })}
                value={newEvent.isPrivate}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={closeAddEvent} style={[styles.actionBtn, { backgroundColor: '#394357' }]}>
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddEvent}
                style={[styles.actionBtn, { backgroundColor: COLORS.accent }]}
              >
                <Text style={styles.actionText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* NEW: Event Details Modal */}
      <Modal transparent visible={isEventDetailsOpen} animationType="fade" onRequestClose={handleCloseEventDetails}>
        <View style={styles.overlay}>
          <ScrollView style={[styles.modalCard, shadow]}>
            {selectedEvent && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={{ color: COLORS.text, fontSize: 18, fontWeight: '600' }}>Event Details</Text>
                  <TouchableOpacity onPress={handleCloseEventDetails} style={styles.iconBtn}>
                    <Ionicons name="close" size={18} color={COLORS.text} />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                  <Image
                    source={CARD_IMAGES[selectedEvent.id]}
                    resizeMode="cover"
                    style={styles.detailsImage}
                  />
                  <Text style={styles.detailsTitle}>{selectedEvent.place}</Text>
                  <Text style={styles.detailsSubtitle}>{selectedEvent.date} • {selectedEvent.country}</Text>

                  <View style={styles.statsRow}>
                      <View style={styles.statBox}>
                        <Ionicons name="people" size={24} color={COLORS.accent} />
                        <Text style={styles.statText}>{selectedEvent.attendees}</Text>
                        <Text style={styles.statLabel}>Attendees</Text>
                      </View>
                      <View style={styles.statBox}>
                        <Ionicons name="cash" size={24} color={COLORS.accent} />
                        <Text style={styles.statText}>${selectedEvent.revenue}</Text>
                        <Text style={styles.statLabel}>Revenue</Text>
                      </View>
                  </View>

                  <TouchableOpacity style={styles.scanQrButtonLarge}>
                    <Ionicons name="qr-code-outline" size={20} color={COLORS.card} />
                    <Text style={styles.scanQrTextLarge}>Scan QR Code</Text>
                  </TouchableOpacity>

                  <View style={styles.commentSection}>
                    <Text style={styles.commentTitle}>Community Feedback</Text>
                    {DUMMY_COMMENTS.map(comment => (
                      <View key={comment.id} style={styles.commentItem}>
                        <Text style={styles.commentUser}>{comment.user}</Text>
                        <Text style={styles.commentText}>{comment.text}</Text>
                      </View>
                    ))}
                    {DUMMY_COMMENTS.length === 0 && (
                      <Text style={styles.noCommentsText}>No comments yet.</Text>
                    )}
                  </View>
                </View>
              </>
            )}
          </ScrollView>
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
      width: '100%', maxHeight: '90%', backgroundColor: COLORS.card, borderRadius: 16,
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
    input: {
      backgroundColor: COLORS.button,
      color: COLORS.text,
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    imagePlaceholder: {
      height: 150,
      backgroundColor: COLORS.button,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: COLORS.subtext,
    },
    imagePlaceholderText: {
      color: COLORS.subtext,
      marginTop: 8,
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.button,
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    uploadButtonText: {
      color: COLORS.text,
      marginLeft: 10,
      fontWeight: '600',
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    toggleText: {
      color: COLORS.text,
      fontSize: 16,
    },
    modalActions: {
      flexDirection: 'row', gap: 10, marginTop: 16, justifyContent: 'flex-end',
    },
    actionBtn: {
      paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10,
    },
    actionText: { color: COLORS.text, fontWeight: '600' },
    scanQrButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.accent,
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
    },
    scanQrText: {
        color: COLORS.card,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    detailsContainer: {
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 20,
    },
    detailsImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 15,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
    },
    detailsSubtitle: {
        fontSize: 14,
        color: COLORS.subtext,
        marginBottom: 20,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.accent,
        marginTop: 5,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.subtext,
        marginTop: 2,
    },
    scanQrButtonLarge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.accent,
        paddingVertical: 12,
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
    },
    scanQrTextLarge: {
        color: COLORS.card,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    commentSection: {
        width: '100%',
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 10,
    },
    commentItem: {
        backgroundColor: COLORS.button,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    commentUser: {
        fontWeight: 'bold',
        color: COLORS.accent,
        marginBottom: 2,
    },
    commentText: {
        color: COLORS.subtext,
    },
    noCommentsText: {
        color: COLORS.subtext,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});