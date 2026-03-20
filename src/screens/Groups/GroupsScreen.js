import React from 'react';
// Import core UI components from React Native
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// Ionicons provides vector icons perfectly sized for mobile
import { Ionicons } from '@expo/vector-icons';
// BlurView gives us our premium "frosted glass" effect background
import { BlurView } from 'expo-blur';
// Our global constants for maintaining a consistent design system
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
// The reusable Wrapper component that draws the abstract mesh background
import GlassBackground from '../../components/GlassBackground';

export default function GroupsScreen({ navigation }) {
  // This is a placeholder array. In the future, this data will come from the backend API.
  const groups = []; 

  return (
    <GlassBackground>
      {/* HEADER */}
      <View style={styles.header}>
        {/* We use COLORS.text here which is dark gray/black to stand out against the light glass */}
        <Text style={styles.title}>My Groups</Text>
        <TouchableOpacity onPress={() => {}}>
          {/* Add button enclosed in a glass wrapper */}
          <BlurView intensity={60} tint="light" style={styles.addBtnGlass}>
            <Ionicons name="add" size={24} color={COLORS.text} />
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* CONDITIONAL RENDERING: Display empty state OR the list of groups */}
      {groups.length === 0 ? (
        // --- EMPTY STATE ---
        <BlurView intensity={60} tint="light" style={styles.emptyStateGlass}>
          <Ionicons name="people-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No Groups Yet</Text>
          <Text style={styles.emptySubtext}>
            Create a Susu group or join an existing one using an invite code.
          </Text>
          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.createBtnText}>Create a Group</Text>
          </TouchableOpacity>
        </BlurView>
      ) : (
        // --- LIST OF GROUPS ---
        // FlatList is highly optimized for rendering long lists of data efficiently
        <FlatList
          data={groups}
          keyExtractor={(item) => item.groupId}
          contentContainerStyle={styles.list}
          // The renderItem function dictates how each individual row should look
          renderItem={({ item }) => (
            <TouchableOpacity>
              <BlurView intensity={60} tint="light" style={styles.groupCardGlass}>
                <View style={[styles.groupIcon, { backgroundColor: COLORS.primaryLight + '30' }]}>
                  <Ionicons name="people" size={24} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.groupName}>{item.groupName}</Text>
                  <Text style={styles.groupMeta}>
                    {item.numMembers} members · {item.frequency}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </BlurView>
            </TouchableOpacity>
          )}
        />
      )}
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLg,
    paddingTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text, // Dark text on light background
  },
  addBtnGlass: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  list: { 
    paddingHorizontal: SIZES.paddingLg, 
    paddingBottom: 120, // Extra padding so it's not hidden behind the bottom tab bar 
  },
  groupCardGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    marginBottom: 12,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Solid enough to read
    overflow: 'hidden',
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupName: { 
    ...FONTS.semiBold, 
    color: COLORS.text,
    fontSize: 16,
  },
  groupMeta: { 
    ...FONTS.regular, 
    fontSize: SIZES.sm, 
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  emptyStateGlass: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingXl,
    marginHorizontal: SIZES.paddingLg,
    marginTop: SIZES.paddingXl,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  emptyTitle: { 
    ...FONTS.h3, 
    marginTop: SIZES.padding, 
    color: COLORS.text,
  },
  emptySubtext: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: SIZES.padding,
  },
  createBtn: {
    marginTop: SIZES.paddingLg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.paddingXl,
    paddingVertical: 12,
    borderRadius: SIZES.radiusFull, // Gives it pill-shaped rounded corners
  },
  createBtnText: {
    color: COLORS.white, // Since primary is dark, text MUST be white here
    ...FONTS.semiBold,
  }
});
