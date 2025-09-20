// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EventsScreen from './screens/EventsScreen';
import SubscriptionsScreen from './screens/SubscriptionsScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#121212',
            borderTopColor: '#333',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Events') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Subs') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#BB86FC', // A light purple for the active tab
          tabBarInactiveTintColor: '#888',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Subs" component={SubscriptionsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}