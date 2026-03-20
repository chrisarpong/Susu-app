import React from 'react';
import { StyleSheet, ImageBackground, useColorScheme } from 'react-native';
// SafeAreaView ensures content doesn't overlap with the notch or home indicator on iPhones
import { SafeAreaView } from 'react-native-safe-area-context';
import { getColors } from '../constants/theme';

export default function GlassBackground({ children, style }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const COLORS = getColors(colorScheme);

  // A clean, abstract fluid gradient that looks like a modern bank card.
  // We use a darker mesh for Dark Mode and a lighter one for Light Mode.
  const darkMeshUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2664&auto=format&fit=crop';
  const lightMeshUrl = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop';

  return (
    /* ImageBackground is a wrapper that places an image behind all its children */
    <ImageBackground
      source={{ uri: isDark ? darkMeshUrl : lightMeshUrl }}
      style={[styles.bgImage, style, { backgroundColor: COLORS.background }]}
    >
      {/* Container to push content down into the safe area (past the time/battery notch) */}
      <SafeAreaView style={styles.safeArea}>
        {/* The 'children' prop represents whatever components are put inside this wrapper */}
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

// StyleSheet.create compiles your CSS-like styles into an optimized format
const styles = StyleSheet.create({
  bgImage: {
    flex: 1, // Tells the element to take up the full available screen space
    resizeMode: 'cover', // Ensures the image stretches beautifully to cover the screen
  },
  safeArea: {
    flex: 1,
  },
});
