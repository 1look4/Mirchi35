import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

// Define theme types
export type Theme = 'light' | 'dark' | 'auto';

// Color palette interfaces
interface ColorPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  border: string;
  card: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  shadow: string;
  overlay: string;
}

// Complete color system
const COLOR_SYSTEM = {
  light: {
    primary: '#dc2626', // Red pepper
    primaryLight: '#fecaca',
    primaryDark: '#b91c1c',
    secondary: '#f59e0b', // Amber
    accent: '#16a34a', // Green
    background: '#fef7ed', // Warm white
    surface: '#ffffff',
    text: '#1f2937', // Gray-900
    textLight: '#6b7280', // Gray-500
    border: '#e5e7eb', // Gray-200
    card: '#ffffff',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    primary: '#ef4444', // Brighter red for dark mode
    primaryLight: '#7f1d1d',
    primaryDark: '#fca5a5',
    secondary: '#f59e0b',
    accent: '#22c55e',
    background: '#0f0f0f',
    surface: '#1a1a1a',
    text: '#f3f4f6', // Gray-100
    textLight: '#9ca3af', // Gray-400
    border: '#374151', // Gray-700
    card: '#262626',
    error: '#f87171',
    warning: '#fbbf24',
    success: '#34d399',
    info: '#60a5fa',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  // Additional themes can be added here
  blue: {
    primary: '#2563eb', // Blue
    primaryLight: '#dbeafe',
    primaryDark: '#1e40af',
    secondary: '#8b5cf6', // Purple
    accent: '#06b6d4', // Cyan
    background: '#f0f9ff',
    surface: '#ffffff',
    text: '#1e293b',
    textLight: '#64748b',
    border: '#e2e8f0',
    card: '#ffffff',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  green: {
    primary: '#059669', // Emerald
    primaryLight: '#d1fae5',
    primaryDark: '#047857',
    secondary: '#0ea5e9', // Sky blue
    accent: '#f59e0b', // Amber
    background: '#f0fdf4',
    surface: '#ffffff',
    text: '#1c1917',
    textLight: '#57534e',
    border: '#e7e5e4',
    card: '#ffffff',
    error: '#dc2626',
    warning: '#d97706',
    success: '#059669',
    info: '#0284c7',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  }
} as const;

// Theme names for UI
export const THEME_NAMES = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto (System)',
  blue: 'Ocean Blue',
  green: 'Forest Green',
} as const;

// Context interface
interface ThemeContextType {
  theme: Theme;
  themeName: keyof typeof COLOR_SYSTEM;
  colors: ColorPalette;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  availableThemes: { id: keyof typeof COLOR_SYSTEM | 'auto'; name: string }[];
  isDark: boolean;
  systemColorScheme: 'light' | 'dark' | null;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'auto' 
}) => {
  const rawSystemColorScheme = useColorScheme();
  const systemColorScheme: 'light' | 'dark' | null = rawSystemColorScheme === 'light' || rawSystemColorScheme === 'dark' ? rawSystemColorScheme : null;
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isReady, setIsReady] = useState(false);

  // Determine which color palette to use
  const getEffectiveTheme = (): keyof typeof COLOR_SYSTEM => {
    if (theme === 'auto') {
      return systemColorScheme || 'light';
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();
  const colors = COLOR_SYSTEM[effectiveTheme];
  const isDark = effectiveTheme === 'dark';

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('app-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto')) {
          setThemeState(savedTheme as Theme);
        }
      } catch (error) {
        console.log('Error loading theme preference:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadThemePreference();
  }, []);

  // Update StatusBar when theme changes
  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    
    // For Android - set background color
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
    }
  }, [isDark, colors.background]);

  // Set theme with persistence
  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('app-theme', newTheme);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  // Toggle between light and dark (skip auto for toggle)
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  // Available themes for selection
  const availableThemes = [
    { id: 'auto' as const, name: THEME_NAMES.auto },
    { id: 'light' as const, name: THEME_NAMES.light },
    { id: 'dark' as const, name: THEME_NAMES.dark },
    { id: 'blue' as const, name: THEME_NAMES.blue },
    { id: 'green' as const, name: THEME_NAMES.green },
  ];

  const value: ThemeContextType = {
    theme,
    themeName: effectiveTheme,
    colors,
    toggleTheme,
    setTheme,
    availableThemes,
    isDark,
    systemColorScheme,
  };

  // Don't render until theme is loaded
  if (!isReady) {
    return null; // Or a loading screen
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to get colors for a specific theme
export const getColorsForTheme = (themeName: keyof typeof COLOR_SYSTEM): ColorPalette => {
  return COLOR_SYSTEM[themeName] || COLOR_SYSTEM.light;
};

// Helper function to create style sheets with theme colors
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styles: (colors: ColorPalette) => T | StyleSheet.NamedStyles<T>
) => {
  return () => {
    const { colors } = useTheme();
    return StyleSheet.create(styles(colors));
  };
};

// Higher Order Component for class components
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: ThemeContextType }>
) => {
  const WrappedComponent = (props: P) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
  WrappedComponent.displayName = `WithTheme(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

// Theme toggle component
export const ThemeToggle: React.FC<{ size?: number }> = ({ size = 24 }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={themeToggleStyles.button}>
      {theme === 'auto' ? (
        <AutoThemeIcon size={size} color={colors.text} />
      ) : isDark ? (
        <SunIcon size={size} color={colors.text} />
      ) : (
        <MoonIcon size={size} color={colors.text} />
      )}
    </TouchableOpacity>
  );
};

// Simple icon components (you can replace these with your actual icon components)
const SunIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View style={[themeToggleStyles.icon, { width: size, height: size }]}>
    <Text style={[themeToggleStyles.iconText, { color }]}>☀️</Text>
  </View>
);

const MoonIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View style={[themeToggleStyles.icon, { width: size, height: size }]}>
    <Text style={[themeToggleStyles.iconText, { color }]}>🌙</Text>
  </View>
);

const AutoThemeIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View style={[themeToggleStyles.icon, { width: size, height: size }]}>
    <Text style={[themeToggleStyles.iconText, { color }]}>⚙️</Text>
  </View>
);

const themeToggleStyles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
});

// Export theme constants for use outside components
export { COLOR_SYSTEM };

// Export the context for class components (if needed)
  export { ThemeContext };

export default ThemeProvider;