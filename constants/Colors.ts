/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

<<<<<<< HEAD
export const Colors = {
  light: {
    // Primary brand colors
    primary: '#0B1D51',      // Dark blue
    secondary: '#725CAD',    // Purple
    accent: '#8CCDEB',       // Light blue
    highlight: '#FFE3A9',    // Cream
    
    // Background and surface colors
    background: '#FFFFFF',
    card: '#FFE3A9',         // Cream cards
    cardSecondary: '#8CCDEB', // Light blue for secondary cards
    
    // Text colors
    text: '#0B1D51',         // Dark blue text
    textSecondary: '#725CAD', // Purple for secondary text
    textLight: '#FFFFFF',    // White text on dark backgrounds
    
    // Interactive elements
    tint: '#725CAD',         // Purple for primary actions
    border: '#8CCDEB',       // Light blue borders
    success: '#4CAF50',      // Green for success states
    warning: '#FF9800',      // Orange for warnings
    error: '#F44336',        // Red for errors
    
    // Gradient colors
    gradientStart: '#0B1D51', // Dark blue
    gradientEnd: '#725CAD',   // Purple
    
    // Additional colors
    icon: '#725CAD',
    tabIconDefault: '#8CCDEB',
    tabIconSelected: '#725CAD',
  },
  dark: {
    // Primary brand colors
    primary: '#0B1D51',      // Dark blue
    secondary: '#725CAD',    // Purple
    accent: '#8CCDEB',       // Light blue
    highlight: '#FFE3A9',    // Cream
    
    // Background and surface colors
    background: '#0B1D51',   // Dark blue background
    card: '#725CAD',         // Purple cards
    cardSecondary: '#8CCDEB', // Light blue for secondary cards
    
    // Text colors
    text: '#FFFFFF',         // White text
    textSecondary: '#FFE3A9', // Cream for secondary text
    textLight: '#FFFFFF',    // White text
    
    // Interactive elements
    tint: '#8CCDEB',         // Light blue for primary actions
    border: '#725CAD',       // Purple borders
    success: '#4CAF50',      // Green for success states
    warning: '#FF9800',      // Orange for warnings
    error: '#F44336',        // Red for errors
    
    // Gradient colors
    gradientStart: '#0B1D51', // Dark blue
    gradientEnd: '#725CAD',   // Purple
    
    // Additional colors
    icon: '#8CCDEB',
    tabIconDefault: '#725CAD',
    tabIconSelected: '#8CCDEB',
=======
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
>>>>>>> 3b65bc3ef85a7aea928c98e23dd496fe60801775
  },
};
