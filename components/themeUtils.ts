// themeUtils.ts - Additional theme utilities

// Generate shades for a color
export const generateColorShades = (baseColor: string) => {
  // This is a simplified version - in a real app you might want to use a library like polished
  return {
    50: lightenColor(baseColor, 0.8),
    100: lightenColor(baseColor, 0.6),
    200: lightenColor(baseColor, 0.4),
    300: lightenColor(baseColor, 0.2),
    400: baseColor,
    500: darkenColor(baseColor, 0.2),
    600: darkenColor(baseColor, 0.4),
    700: darkenColor(baseColor, 0.6),
    800: darkenColor(baseColor, 0.8),
    900: darkenColor(baseColor, 0.9),
  };
};

// Simple color manipulation functions
const lightenColor = (color: string, amount: number): string => {
  // Simplified implementation - use a proper color library in production
  return color; // Placeholder
};

// Define ColorPalette type
export type ColorPalette = {
  shadow: string;
  text: string;
  textLight: string;
  // Add other color properties as needed
};

const darkenColor = (color: string, amount: number): string => {
  // Simplified implementation - use a proper color library in production
  return color; // Placeholder
};

// Create shadow styles based on theme
export const createShadowStyles = (colors: ColorPalette) => ({
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

// Create text styles based on theme
export const createTextStyles = (colors: ColorPalette) => ({
  heading: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
  },
});