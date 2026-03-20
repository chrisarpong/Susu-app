import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, ScrollView, Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';
import { useUser } from '../../context/UserContext';

export default function EditProfileScreen({ navigation }) {
  const { userData, updateUser } = useUser();

  // Pre-fill the fields with the current user data from context
  const [fullName, setFullName] = useState(userData.fullName || '');
  const [email, setEmail] = useState(userData.email || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const [profileImage, setProfileImage] = useState(userData.profileImage || null);

  const pickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Save updated data back into context
    updateUser({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      profileImage,
    });
    navigation.goBack();
  };

  const isFormValid = fullName.trim().length > 0;

  return (
    <GlassBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* HEADER */}
        <Animated.View entering={FadeInDown.delay(50).duration(600).springify()} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!isFormValid}
            style={[styles.saveBtn, !isFormValid && { opacity: 0.4 }]}
          >
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* AVATAR PICKER */}
          <Animated.View entering={FadeInDown.delay(100).duration(800).springify()} style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.avatarWrapper}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="person" size={40} color={COLORS.white} />
                  </View>
                )}
                <View style={styles.editBadge}>
                  <Ionicons name="camera" size={14} color={COLORS.white} />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* FORM FIELDS */}
          <Animated.View entering={FadeInDown.delay(200).duration(800).springify()} style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <BlurView intensity={80} tint="light" style={styles.inputGlass}>
              <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor={COLORS.textLight}
                value={fullName}
                onChangeText={setFullName}
              />
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(800).springify()} style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <BlurView intensity={80} tint="light" style={styles.inputGlass}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                placeholderTextColor={COLORS.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(800).springify()} style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <BlurView intensity={80} tint="light" style={styles.inputGlass}>
              <Ionicons name="call-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="+233 XX XXX XXXX"
                placeholderTextColor={COLORS.textLight}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </BlurView>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radiusFull,
  },
  saveBtnText: {
    color: COLORS.white,
    ...FONTS.semiBold,
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: SIZES.paddingXl,
    paddingTop: SIZES.paddingLg,
    paddingBottom: 80,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SIZES.paddingXl,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  formGroup: {
    marginBottom: SIZES.paddingLg,
  },
  label: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    paddingHorizontal: SIZES.padding,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...FONTS.md,
    color: COLORS.text,
    height: '100%',
  },
});
