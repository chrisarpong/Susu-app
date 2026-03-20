import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';

export default function NotificationsScreen({ navigation }) {
  // Array of notifications. When empty, it displays the "All Clear" state
  const notifications = []; 
  const [hasPermission, setHasPermission] = React.useState(null);

  React.useEffect(() => {
    // Check current permissions silently on mount
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const requestNotificationPermission = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const { status } = await Notifications.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    
    // Optional: Play success haptic
    if (status === 'granted') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <GlassBackground>
      {/* HEADER WITH BACK BUTTON */}
      <View style={styles.header}>
        {/* navigation.goBack() returns the user to the previous screen in the stack */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        {/* An empty view to perfectly center the title (matches the width of the back button) */}
        <View style={{ width: 40 }} />
      </View>

      {/* CONDITIONAL RENDER FOR NOTIFICATION PERMISSIONS */}
      {/* We only show this beautiful permission prompt if they haven't granted it yet! */}
      {hasPermission === false && (
        <Animated.View entering={FadeInDown.delay(100).duration(800).springify()}>
          <TouchableOpacity onPress={requestNotificationPermission} style={styles.permissionWrapper}>
            <BlurView intensity={80} tint="light" style={styles.permissionGlass}>
              <View style={styles.permissionIconBadge}>
                <Ionicons name="notifications" size={24} color={COLORS.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.permissionTitle}>Turn on Notifications</Text>
                <Text style={styles.permissionSubtext}>Get alerted when it's your turn to be paid from the Vault.</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
            </BlurView>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* CONDITIONAL RENDER FOR EMPTY STATE */}
      {notifications.length === 0 ? (
        <BlurView intensity={60} tint="light" style={styles.emptyStateGlass}>
          <Ionicons name="notifications-off-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>All Clear!</Text>
          <Text style={styles.emptySubtext}>
            You have no notifications right now.
          </Text>
        </BlurView>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.notificationId}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <BlurView intensity={60} tint="light" style={[styles.notifCardGlass, !item.isRead && styles.unread]}>
                <View style={[styles.dot, item.isRead && { backgroundColor: 'transparent' }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifMsg}>{item.message}</Text>
                  <Text style={styles.notifDate}>{item.sentAt}</Text>
                </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLg,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.paddingSm,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    ...FONTS.h3, 
    textAlign: 'center', 
    color: COLORS.text 
  },
  permissionWrapper: {
    paddingHorizontal: SIZES.paddingLg,
    marginBottom: SIZES.paddingLg,
  },
  permissionGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.paddingLg,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)', // Bright, premium border
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    overflow: 'hidden',
  },
  permissionIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  permissionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  permissionSubtext: {
    ...FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  list: { 
    paddingHorizontal: SIZES.paddingLg, 
    paddingBottom: 120 
  },
  notifCardGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    marginBottom: 10,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  unread: { 
    borderLeftWidth: 4, 
    borderLeftColor: COLORS.primary 
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 12,
  },
  notifMsg: { 
    ...FONTS.medium, 
    color: COLORS.text,
    fontSize: 15,
  },
  notifDate: { 
    ...FONTS.regular, 
    fontSize: SIZES.xs, 
    color: COLORS.textSecondary, 
    marginTop: 4 
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
    color: COLORS.text 
  },
  emptySubtext: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: SIZES.padding,
  },
});
