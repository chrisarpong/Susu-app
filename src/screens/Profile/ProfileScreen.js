import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';
import { useUser } from '../../context/UserContext';

export default function ProfileScreen({ route }) {
  const { onLogout } = route?.params || {};
  const navigation = useNavigation();
  const { userData } = useUser();

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', color: COLORS.primary, action: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      navigation.navigate('EditProfile');
    }},
    { icon: 'wallet-outline', label: 'Link Mobile Wallet', color: COLORS.secondary },
    { icon: 'notifications-outline', label: 'Notifications', color: '#8B5CF6' },
    { icon: 'shield-outline', label: 'Disputes', color: COLORS.warning },
    { icon: 'help-circle-outline', label: 'Help & Support', color: COLORS.success },
    { icon: 'log-out-outline', label: 'Log Out', color: COLORS.error, action: onLogout },
  ];

  return (
    <GlassBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* === USER INFO SECTION === */}
        <Animated.View entering={FadeInDown.delay(100).duration(800).springify()} style={styles.profileSection}>
          {/* Dynamic Avatar — shows photo if set, otherwise shows person icon */}
          <TouchableOpacity onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate('EditProfile');
          }}>
            {userData.profileImage ? (
              <Image source={{ uri: userData.profileImage }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={COLORS.white} />
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.userName}>{userData.fullName || 'Friend'}</Text>
          <Text style={styles.userEmail}>{userData.email || 'No email set'}</Text>

          <View style={styles.badgeRow}>
            <BlurView intensity={60} tint="light" style={styles.badgeGlass}>
              <Ionicons name="close-circle" size={14} color={COLORS.error} />
              <Text style={styles.badgeText}>Not Verified</Text>
            </BlurView>
            <BlurView intensity={60} tint="light" style={styles.badgeGlass}>
              <Ionicons name="wallet-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.badgeText}>Wallet Not Linked</Text>
            </BlurView>
          </View>
        </Animated.View>

        {/* === MENU ITEMS === */}
        <Animated.View entering={FadeInDown.delay(200).duration(800).springify()}>
          <BlurView intensity={80} tint="light" style={styles.menuSectionGlass}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.action}
                style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
              </TouchableOpacity>
            ))}
          </BlurView>
        </Animated.View>

        <Text style={styles.version}>PledgePay v1.0.0</Text>

      </ScrollView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
    paddingTop: SIZES.paddingLg,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLg,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...SHADOWS.medium,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    ...SHADOWS.medium,
  },
  userName: {
    ...FONTS.h2,
    marginTop: SIZES.padding,
    color: COLORS.text,
  },
  userEmail: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: SIZES.padding,
  },
  badgeGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  badgeText: {
    fontSize: SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  menuSectionGlass: {
    marginHorizontal: SIZES.paddingLg,
    marginTop: SIZES.padding,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    ...FONTS.medium,
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: SIZES.xs,
    paddingVertical: SIZES.paddingXl,
  },
});

