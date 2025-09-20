// screens/EventsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


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
 { id: '1', place: 'Thursday Cycling Club', country: 'Aberdeen' },
 { id: '2', place: 'Poker Night', country: 'Sahali' },
 { id: '3', place: 'CS25 Study Group', country: 'TRU Campus' },
 { id: '4', place: 'Nightshift on 5th', country: 'Downtown' },
 { id: '5', place: 'Trivia Tuesday', country: 'Valleyview' },
 { id: '6', place: 'Open Mic Night', country: 'North Shore' },
];


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 16;
const GAP = 12;
const CARD_RADIUS = 16;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - GAP) / 2;
const CARD_HEIGHT = 180;


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
 return (
   <SafeAreaView
     style={{ flex: 1, backgroundColor: COLORS.bg }}
     edges={['top', 'left', 'right']}
   >
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
             width: 36,
             height: 36,
             borderRadius: 18,
             alignItems: 'center',
             justifyContent: 'center',
           },
           shadow,
         ]}
         accessibilityLabel="Search"
       >
         <Ionicons name="search" size={20} color={COLORS.icon} />
       </TouchableOpacity>
     </View>


     {/* Banner (shadow wrapper -> clipped inner for rounded fill) */}
     <View
       style={[
         { marginHorizontal: 16, marginBottom: 12, borderRadius: 24 },
         shadow,
       ]}
     >
       <View
         style={{
           backgroundColor: COLORS.banner,
           height: 190,
           borderRadius: 24,
           overflow: 'hidden', // clip to rounded corners
         }}
       >
         <Image
           source={require('../assets/images/banner2.png')}
           resizeMode="cover"              // fill the space
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
         style={[
           {
             marginLeft: 'auto',
             backgroundColor: COLORS.button,
             paddingVertical: 8,
             paddingHorizontal: 16,
             borderRadius: 9999,
             marginRight: 8,
           },
           shadow,
         ]}
       >
         <Text style={{ color: COLORS.text, fontSize: 14, fontWeight: '500' }}>
           My Events
         </Text>
       </TouchableOpacity>


       <TouchableOpacity
         style={[
           {
             backgroundColor: COLORS.button,
             width: 36,
             height: 36,
             borderRadius: 18,
             alignItems: 'center',
             justifyContent: 'center',
           },
           shadow,
         ]}
         accessibilityLabel="Add Event"
       >
         <Ionicons name="add" size={22} color={COLORS.icon} />
       </TouchableOpacity>
     </View>


     {/* Events Grid */}
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
         </TouchableOpacity>
       )}
       ListFooterComponent={<View style={{ height: 12 }} />}
     />
   </SafeAreaView>
 );
}



