import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/theme';

import HomeScreen from '../screens/Home/HomeScreen';
import GroupsScreen from '../screens/Groups/GroupsScreen';
import VaultsScreen from '../screens/Vaults/VaultsScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Groups: { focused: 'people', unfocused: 'people-outline' },
  Vaults: { focused: 'shield-checkmark', unfocused: 'shield-checkmark-outline' },
  Transactions: { focused: 'receipt', unfocused: 'receipt-outline' },
  Profile: { focused: 'person', unfocused: 'person-outline' },
};

export default function TabNavigator({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = tabIcons[route.name];
          return (
            <Ionicons
              name={focused ? icons.focused : icons.unfocused}
              size={22}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: COLORS.secondary,           // Bright blue when selected — pops on glass
        tabBarInactiveTintColor: COLORS.text,                // Dark slate when unselected — clearly visible
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 85,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarBackground: () => (
          <BlurView 
            tint="light" 
            intensity={80} 
            style={StyleSheet.absoluteFill} 
          >
            {/* Extremely subtle top border for the glass edge */}
            <View style={{
               height: 1, 
               backgroundColor: 'rgba(0,0,0,0.05)',  // Changed from white back to a subtle shadow line
               width: '100%',
               position: 'absolute',
               top: 0 
            }} />
          </BlurView>
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Vaults" component={VaultsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        initialParams={{ onLogout }}
      />
    </Tab.Navigator>
  );
}
