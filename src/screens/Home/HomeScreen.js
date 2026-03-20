import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';
import { useUser } from '../../context/UserContext';

// --- TIME-AWARE GREETING ---
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}



export default function HomeScreen({ navigation }) {
  const { userData } = useUser();
  const firstName = userData.fullName ? userData.fullName.split(' ')[0] : 'Friend';
  const greeting = useMemo(() => getGreeting(), []);
  const [balanceHidden, setBalanceHidden] = useState(false);

  const quickActions = [
    { icon: 'add-circle', label: 'Add\nMoney', gradient: ['#2563EB', '#1D4ED8'], screen: 'AddMoney' },
    { icon: 'paper-plane', label: 'Send\nMoney', gradient: ['#8B5CF6', '#7C3AED'], screen: 'Send' },
    { icon: 'people', label: 'Join\nGroup', gradient: ['#10B981', '#059669'], screen: 'Groups' },
    { icon: 'shield-checkmark', label: 'Save to\nVault', gradient: ['#F59E0B', '#D97706'], screen: 'Vaults' },
  ];

  return (
    <GlassBackground>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ======== HEADER ======== */}
        <Animated.View entering={FadeInDown.delay(50).duration(600).springify()} style={styles.header}>
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate('Profile');
            }}
          >
            {userData.profileImage ? (
              <Image source={{ uri: userData.profileImage }} style={styles.headerAvatar} />
            ) : (
              <LinearGradient colors={['#2563EB', '#8B5CF6']} style={styles.headerAvatar}>
                <Text style={styles.headerAvatarText}>{firstName.charAt(0).toUpperCase()}</Text>
              </LinearGradient>
            )}
            <View style={styles.headerTextBlock}>
              <Text style={styles.greeting}>{greeting} 👋</Text>
              <Text style={styles.name}>{firstName}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate('Notifications');
            }}
          >
            <BlurView intensity={60} tint="light" style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
              <View style={styles.notifBadge} />
            </BlurView>
          </TouchableOpacity>
        </Animated.View>

        {/* ======== BALANCE CARD ======== */}
        <Animated.View entering={FadeInDown.delay(100).duration(700).springify()}>
          <LinearGradient
            colors={['#0F172A', '#1E293B', '#334155']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCard}
          >
            {/* Decorative circles */}
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setBalanceHidden(!balanceHidden);
              }}>
                <Ionicons
                  name={balanceHidden ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="rgba(255,255,255,0.6)"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.balanceAmount}>
              {balanceHidden ? '••••••••' : 'GH₵ 0.00'}
            </Text>

            <View style={styles.balanceStats}>
              <View style={styles.statPill}>
                <View style={[styles.statDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.statText}>+GH₵ 0</Text>
                <Text style={styles.statLabel}>income</Text>
              </View>
              <View style={styles.statPill}>
                <View style={[styles.statDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.statText}>-GH₵ 0</Text>
                <Text style={styles.statLabel}>spent</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* ======== QUICK ACTIONS ======== */}
        <View style={styles.actionsRow}>
          {quickActions.map((action, index) => (
            <Animated.View key={index} entering={FadeInDown.delay(200 + index * 80).duration(600).springify()}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                activeOpacity={0.7}
              >
                <LinearGradient colors={action.gradient} style={styles.actionIcon}>
                  <Ionicons name={action.icon} size={24} color="#FFF" />
                </LinearGradient>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* ======== ACTIVE GROUPS ======== */}
        <Animated.View entering={FadeInDown.delay(500).duration(700).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Groups</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <BlurView intensity={70} tint="light" style={styles.emptyState}>
            <Ionicons name="people-outline" size={40} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No groups yet</Text>
            <Text style={styles.emptySub}>Join or create a Susu group to get started.</Text>
          </BlurView>
        </Animated.View>

        {/* ======== RECENT TRANSACTIONS ======== */}
        <Animated.View entering={FadeInDown.delay(700).duration(700).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <BlurView intensity={70} tint="light" style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={40} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptySub}>Your activity will appear here.</Text>
          </BlurView>
        </Animated.View>

      </ScrollView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },

  // --- HEADER ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLg,
    paddingTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  headerAvatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTextBlock: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 1,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },

  // --- BALANCE CARD ---
  balanceCard: {
    marginHorizontal: SIZES.paddingLg,
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  decorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '500',
  },

  // --- QUICK ACTIONS ---
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLg,
    marginTop: 24,
    marginBottom: 8,
  },
  actionBtn: {
    alignItems: 'center',
    width: 72,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...SHADOWS.small,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 15,
  },

  // --- SECTION HEADER ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLg,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },

  // --- GROUPS CAROUSEL ---
  groupsScroll: {
    paddingHorizontal: SIZES.paddingLg,
    gap: 12,
  },
  groupCard: {
    width: 180,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  groupTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  groupMetaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  progressTrack: {
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPercentText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  payoutText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },

  // --- TRANSACTIONS ---
  txList: {
    marginHorizontal: SIZES.paddingLg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  txDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  txIn: {
    color: '#10B981',
  },
  txOut: {
    color: COLORS.text,
  },

  // --- EMPTY STATES ---
  emptyState: {
    alignItems: 'center',
    paddingVertical: 28,
    marginHorizontal: SIZES.paddingLg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
});
