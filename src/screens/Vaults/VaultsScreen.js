import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';

export default function VaultsScreen({ navigation }) {
  // This is a placeholder array. Data will eventually come from our Spring Boot backend.
  const vaults = []; 

  return (
    // Reusable wrapper to ensure the abstract mesh background is rendered
    <GlassBackground>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Savings Vaults</Text>
        <TouchableOpacity onPress={() => {}}>
          <BlurView intensity={60} tint="light" style={styles.addBtnGlass}>
            <Ionicons name="add" size={24} color={COLORS.text} />
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* 
        This is called a Conditional Render.
        If vaults.length is exactly 0, show the Empty State.
        Otherwise (:) show the FlatList of vaults.
      */}
      {vaults.length === 0 ? (
        <BlurView intensity={60} tint="light" style={styles.emptyStateGlass}>
          <Ionicons name="shield-checkmark-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No Vaults Yet</Text>
          <Text style={styles.emptySubtext}>
            Create a personal savings vault to start saving towards your goals.
          </Text>
          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.createBtnText}>Create a Vault</Text>
          </TouchableOpacity>
        </BlurView>
      ) : (
        <FlatList
          data={vaults}
          keyExtractor={(item) => item.vaultId}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <BlurView intensity={60} tint="light" style={styles.vaultCardGlass}>
                <View style={[styles.vaultIcon, { backgroundColor: COLORS.secondaryLight + '30' }]}>
                  <Ionicons name="shield-checkmark" size={24} color={COLORS.secondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.vaultName}>{item.purpose}</Text>
                  <Text style={styles.vaultMeta}>
                    Goal: GH₵ {item.goalAmount} · {item.frequency}
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

// StyleSheet keeps our UI code organized and optimizes rendering speed
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
    color: COLORS.text 
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
    paddingBottom: 120 // Adds empty space at the bottom so the TabBar doesn't hide the last item
  },
  vaultCardGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    marginBottom: 12,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  vaultIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vaultName: { ...FONTS.semiBold, color: COLORS.text, fontSize: 16 },
  vaultMeta: { ...FONTS.regular, fontSize: SIZES.sm, color: COLORS.textSecondary, marginTop: 2 },
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
  emptyTitle: { ...FONTS.h3, marginTop: SIZES.padding, color: COLORS.text },
  emptySubtext: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: SIZES.padding,
  },
  createBtn: {
    marginTop: SIZES.paddingLg,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.paddingXl,
    paddingVertical: 12,
    borderRadius: SIZES.radiusFull,
  },
  createBtnText: {
    color: COLORS.white,
    ...FONTS.semiBold,
  }
});
