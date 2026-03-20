export const getColors = (colorScheme) => {
  const isDark = colorScheme === 'dark';

  return {
    // Primary brand color
    primary: '#0F172A', // Keep the dark blue for brand consistency across modes
    primaryLight: '#334155',

    // Secondary brand color
    secondary: '#2563EB',
    secondaryLight: '#60A5FA',

    // Semantic colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',

    // Backgrounds and Text
    // This is the core of our pseudo-dark mode hack. We flip text colors based on the theme.
    // Since our GlassBackground is an image, we only need to invert text/white values.
    background: isDark ? '#000000' : '#F8FAFC', 
    white: isDark ? '#1E293B' : '#FFFFFF', 
    
    text: isDark ? '#F8FAFC' : '#0F172A', 
    textSecondary: isDark ? '#94A3B8' : '#475569', 
    textLight: isDark ? '#475569' : '#94A3B8', 
    
    divider: isDark ? '#334155' : '#E2E8F0',
  };
};

// Fallback constant for anything not inside a functional component that uses the hook yet
export const COLORS = getColors('light');

export const SIZES = {
  // Global sizes used for padding and margins
  base: 8,
  font: 14,
  radius: 12,
  radiusLg: 24,
  radiusFull: 9999,
  paddingSm: 12,
  padding: 16,
  paddingLg: 24,
  paddingXl: 32,

  // Font sizes
  h1: 30,
  h2: 24,
  h3: 18,
  md: 16,
  sm: 14,
  xs: 12,
};

export const FONTS = {
  bold: { fontWeight: '700' },
  semiBold: { fontWeight: '600' },
  medium: { fontWeight: '500' },
  regular: { fontWeight: '400' },
  h1: { fontSize: SIZES.h1, fontWeight: '700' },
  h2: { fontSize: SIZES.h2, fontWeight: '700' },
  h3: { fontSize: SIZES.h3, fontWeight: '600' },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
