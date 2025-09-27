import LanguageProvider, { useLanguage } from '@/components/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Award,
  Building,
  ChevronRight,
  Clock,
  Heart,
  Home,
  Languages,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Navigation,
  Search,
  Settings,
  Store,
  Sun,
  User,
  Users,
  X,
  Zap
} from 'lucide-react-native';
import React, { createContext, useContext, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Theme Context
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Language Context
type Language = 'en' | 'kn' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Internationalization Strings
const translations = {
  en: {
    // Header
    appName: 'LocalFind',
    currentLocation: 'New York, NY',
    
    // Menu
    menu: 'Menu',
    home: 'Home',
    wishlist: 'Wishlist',
    preferences: 'My Preferences',
    profile: 'Profile',
    logout: 'Logout',
    language: 'Language',
    theme: 'Theme',
    
    // Bottom Navigation
    businesses: 'Businesses',
    setLocation: 'Set Location',
    recent: 'Recent',
    profileSettings: 'Profile',
    
    // Content
    heroTitle: 'Find Anything, Locally.',
    searchPlaceholder: 'Search for businesses, services...',
    findNearMe: 'Find Near Me',
    categories: 'Categories',
    featuredBusinesses: 'Featured Businesses',
    popularNearby: 'Popular Nearby',
    viewAll: 'View All',
    seeMore: 'See More',
    
    // Categories
    restaurants: 'Restaurants',
    services: 'Services',
    shopping: 'Shopping',
    beauty: 'Beauty',
    
    // Language Page
    chooseLanguage: 'Choose Language',
    english: 'English',
    kannada: 'Kannada',
    hindi: 'Hindi',
    
    // Theme
    light: 'Light',
    dark: 'Dark',
  },
  kn: {
    // Header
    appName: 'ಲೋಕಲ್‌ಫೈಂಡ್',
    currentLocation: 'ನ್ಯೂಯಾರ್ಕ್, NY',
    
    // Menu
    menu: 'ಮೆನು',
    home: 'ಮುಖಪುಟ',
    wishlist: 'ನನ್ನ ಇಷ್ಟಗಳು',
    preferences: 'ನನ್ನ ಆದ್ಯತೆಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    logout: 'ಲಾಗ್‌ಔಟ್',
    language: 'ಭಾಷೆ',
    theme: 'ಥೀಮ್',
    
    // Bottom Navigation
    businesses: 'ವ್ಯವಸಾಯಗಳು',
    setLocation: 'ಸ್ಥಳ ಹೊಂದಿಸಿ',
    recent: 'ಇತ್ತೀಚಿನ',
    profileSettings: 'ಪ್ರೊಫೈಲ್',
    
    // Content
    heroTitle: 'ಏನನ್ನಾದರೂ ಸ್ಥಳೀಯವಾಗಿ ಹುಡುಕಿ.',
    searchPlaceholder: 'ವ್ಯವಸಾಯಗಳು, ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...',
    findNearMe: 'ನನ್ನ ಸಮೀಪ ಹುಡುಕಿ',
    categories: 'ವರ್ಗಗಳು',
    featuredBusinesses: 'ವಿಶೇಷ ವ್ಯವಸಾಯಗಳು',
    popularNearby: 'ಸಮೀಪದ ಜನಪ್ರಿಯ',
    viewAll: 'ಎಲ್ಲಾ ನೋಡಿ',
    seeMore: 'ಇನ್ನಷ್ಟು ನೋಡಿ',
    
    // Categories
    restaurants: 'ಉಪಾಹಾರ ಗೃಹಗಳು',
    services: 'ಸೇವೆಗಳು',
    shopping: 'ಶಾಪಿಂಗ್',
    beauty: 'ಸೌಂದರ್ಯ',
    
    // Language Page
    chooseLanguage: 'ಭಾಷೆ ಆರಿಸಿ',
    english: 'ಇಂಗ್ಲಿಷ್',
    kannada: 'ಕನ್ನಡ',
    hindi: 'ಹಿಂದಿ',
    
    // Theme
    light: 'ಬೆಳಕು',
    dark: 'ಗಾಢ',
  },
  hi: {
    // Header
    appName: 'लोकलफाइंड',
    currentLocation: 'न्यूयॉर्क, NY',
    
    // Menu
    menu: 'मेनू',
    home: 'होम',
    wishlist: 'विशलिस्ट',
    preferences: 'मेरी प्राथमिकताएं',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    language: 'भाषा',
    theme: 'थीम',
    
    // Bottom Navigation
    businesses: 'व्यवसाय',
    setLocation: 'लोकेशन सेट करें',
    recent: 'हालिया',
    profileSettings: 'प्रोफाइल',
    
    // Content
    heroTitle: 'कुछ भी ढूंढें, स्थानीय रूप से।',
    searchPlaceholder: 'व्यवसायों, सेवाओं की खोज करें...',
    findNearMe: 'मेरे नजदीक ढूंढें',
    categories: 'श्रेणियां',
    featuredBusinesses: 'फीचर्ड व्यवसाय',
    popularNearby: 'आसपास के लोकप्रिय',
    viewAll: 'सभी देखें',
    seeMore: 'और देखें',
    
    // Categories
    restaurants: 'रेस्तरां',
    services: 'सेवाएं',
    shopping: 'शॉपिंग',
    beauty: 'ब्यूटी',
    
    // Language Page
    chooseLanguage: 'भाषा चुनें',
    english: 'अंग्रेजी',
    kannada: 'कन्नड़',
    hindi: 'हिन्दी',
    
    // Theme
    light: 'लाइट',
    dark: 'डार्क',
  }
};

// Color palettes for light and dark themes
const LIGHT_COLORS = {
  primary: '#dc2626', // Red pepper primary
  primaryLight: '#fecaca',
  primaryDark: '#b91c1c',
  secondary: '#f59e0b', // Amber accent
  accent: '#16a34a', // Green accent
  background: '#fef7ed', // Warm white background
  surface: '#ffffff',
  text: '#1f2937',
  textLight: '#6b7280',
  border: '#e5e7eb',
  card: '#ffffff',
};

const DARK_COLORS = {
  primary: '#ef4444', // Brighter red for dark mode
  primaryLight: '#7f1d1d',
  primaryDark: '#fca5a5',
  secondary: '#f59e0b',
  accent: '#22c55e',
  background: '#0f0f0f',
  surface: '#1a1a1a',
  text: '#f3f4f6',
  textLight: '#9ca3af',
  border: '#374151',
  card: '#262626',
};

const getColors = (theme: Theme) => theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

// Types
type RootStackParamList = {
  Home: undefined;
  NearMe: undefined;
  Businesses: undefined;
  Profile: undefined;
  Wishlist: undefined;
  Preferences: undefined;
  Language: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

type Category = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

type Business = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  rating: number;
  distance: string;
};

// Unsplash Image URLs - Relevant to business categories
const UNSPLASH_IMAGES = {
  banners: [
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
  ],
  restaurants: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=120&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=120&fit=crop',
  ],
  services: [
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&h=120&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=120&fit=crop',
  ],
  shopping: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=120&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=120&fit=crop',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=150&h=120&fit=crop',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=150&h=120&fit=crop',
  ],
  general: [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=150&h=120&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=120&fit=crop',
  ]
};

// Mock data and hooks
const useBusiness = () => ({
  getBusinessesInRadius: (): Business[] => [
    { 
      id: '1', 
      name: 'Bella Italia Restaurant', 
      category: 'Italian Cuisine',
      imageUrl: UNSPLASH_IMAGES.restaurants[0],
      rating: 4.5,
      distance: '0.5 mi'
    },
    { 
      id: '2', 
      name: 'Tech Repair Pro', 
      category: 'Electronics Repair',
      imageUrl: UNSPLASH_IMAGES.services[0],
      rating: 4.8,
      distance: '1.2 mi'
    },
    { 
      id: '3', 
      name: 'Urban Fashion Store', 
      category: 'Clothing Retail',
      imageUrl: UNSPLASH_IMAGES.shopping[0],
      rating: 4.3,
      distance: '0.8 mi'
    },
    { 
      id: '4', 
      name: 'Serenity Spa', 
      category: 'Beauty & Wellness',
      imageUrl: UNSPLASH_IMAGES.beauty[0],
      rating: 4.9,
      distance: '1.5 mi'
    },
    { 
      id: '5', 
      name: 'Downtown Cafe', 
      category: 'Coffee Shop',
      imageUrl: UNSPLASH_IMAGES.restaurants[1],
      rating: 4.6,
      distance: '0.3 mi'
    },
  ],
  banners: UNSPLASH_IMAGES.banners.map(imageUrl => ({ imageUrl })),
});

const useLocationMock = () => ({
  getLocation: () => console.log('Getting location...'),
  currentLocation: 'New York, NY'
});

const toast = (options: { title: string }) => {
  console.log('Toast:', options.title);
};

// Theme Provider
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Language Provider
// const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [language, setLanguage] = useState<Language>('en');

//   const t = (key: string): string => {
//     return translations[language][key as keyof typeof translations.en] || key;
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// Custom hooks for contexts
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };

// Components
const Button = ({ 
  onPress, 
  children, 
  variant = 'default',
  size = 'default',
  className = '' 
}: { 
  onPress: () => void; 
  children: React.ReactNode;
  variant?: 'default' | 'ghost';
  size?: 'default' | 'sm';
  className?: string;
}) => {
  const { theme } = useTheme();
  const colors = getColors(theme);

  const getButtonStyle = () => {
    const baseStyle = {
      padding: size === 'sm' ? 8 : 12,
      borderRadius: 8,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    };

    if (variant === 'ghost') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
      };
    }

    return {
      ...baseStyle,
      backgroundColor: colors.primary,
    };
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={{
        color: variant === 'ghost' ? colors.primary : 'white',
        fontSize: size === 'sm' ? 14 : 16,
        fontWeight: '600',
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { width } = Dimensions.get('window');
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <View style={{ width, height: 200 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: currentIndex * width, y: 0 }}
        scrollEnabled={false}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width, height: 200 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const BusinessCard = ({ business }: { business: Business }) => {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.businessCard}>
      <Image
        source={{ uri: business.imageUrl }}
        style={styles.businessImage}
        resizeMode="cover"
      />
      <View style={styles.businessInfo}>
        <Text style={styles.businessName} numberOfLines={1}>{business.name}</Text>
        <Text style={styles.businessCategory} numberOfLines={1}>{business.category}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {business.rating}</Text>
          <Text style={styles.distance}>{business.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Language Selection Page
const LanguagePage = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const languages = [
    { code: 'en' as Language, name: t('english'), native: 'English' },
    { code: 'kn' as Language, name: t('kannada'), native: 'ಕನ್ನಡ' },
    { code: 'hi' as Language, name: t('hindi'), native: 'हिन्दी' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.languageTitle}>{t('chooseLanguage')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.languageContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageItem,
              language === lang.code && styles.languageItemActive
            ]}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageName}>{lang.name}</Text>
              <Text style={styles.languageNative}>{lang.native}</Text>
            </View>
            {language === lang.code && (
              <View style={styles.languageSelectedIndicator}>
                <View style={styles.languageSelectedDot} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Flyout Menu Component
const FlyoutMenu = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const navigation = useNavigation<NavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const colors = getColors(theme);
  const styles = createStyles(colors);
  const [slideAnim] = useState(new Animated.Value(-300));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { icon: Home, label: t('home'), screen: 'Home' as keyof RootStackParamList },
    { icon: Heart, label: t('wishlist'), screen: 'Wishlist' as keyof RootStackParamList },
    { icon: Settings, label: t('preferences'), screen: 'Preferences' as keyof RootStackParamList },
    { icon: User, label: t('profile'), screen: 'Profile' as keyof RootStackParamList },
    { icon: Languages, label: t('language'), screen: 'Language' as keyof RootStackParamList },
  ];

  const handleMenuItemPress = (item: typeof menuItems[0]) => {
    navigation.navigate(item.screen);
    onClose();
  };

  const handleLogout = () => {
    toast({ title: t('logout') });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.menuOverlay}>
        <TouchableOpacity 
          style={styles.menuBackdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View 
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>{t('menu')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
              >
                <View style={styles.menuItemContent}>
                  <item.icon size={24} color={colors.primary} />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color={colors.textLight} />
              </TouchableOpacity>
            ))}
            
            {/* Theme Toggle in Menu */}
            <View style={styles.themeToggleContainer}>
              <View style={styles.menuItemContent}>
                {theme === 'light' ? <Sun size={24} color={colors.primary} /> : <Moon size={24} color={colors.primary} />}
                <Text style={styles.menuItemText}>{t('theme')}</Text>
              </View>
              <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                <Text style={styles.themeToggleText}>
                  {theme === 'light' ? t('dark') : t('light')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Logout Item */}
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <View style={styles.menuItemContent}>
                <LogOut size={24} color="#ef4444" />
                <Text style={[styles.menuItemText, styles.logoutText]}>{t('logout')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ currentScreen }: { currentScreen: string }) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);

  const navItems = [
    { icon: Home, label: t('home'), screen: 'Home' as keyof RootStackParamList },
    { icon: Building, label: t('businesses'), screen: 'Businesses' as keyof RootStackParamList },
    { icon: Navigation, label: t('setLocation'), screen: 'NearMe' as keyof RootStackParamList },
    { icon: Clock, label: t('recent'), screen: 'Home' as keyof RootStackParamList },
    { icon: Settings, label: t('profileSettings'), screen: 'Profile' as keyof RootStackParamList },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <TouchableOpacity
            key={item.label}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <item.icon 
              size={22} 
              color={isActive ? colors.primary : colors.textLight} 
            />
            <Text style={[
              styles.navLabel,
              { color: isActive ? colors.primary : colors.textLight }
            ]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Header Component
const Header = () => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const colors = getColors(theme);
  const styles = createStyles(colors);
  const { currentLocation } = useLocationMock();

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleLocationPress = () => {
    navigation.navigate('NearMe');
  };

  const handleLanguagePress = () => {
    navigation.navigate('Language');
  };

  return (
    <>
      <View style={styles.header}>
        {/* Left Menu Icon */}
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleMenuPress}
        >
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Center Logo and Location */}
        <TouchableOpacity 
          style={styles.headerCenter}
          onPress={handleLocationPress}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{t('appName')}</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.primary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {t('currentLocation')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right Icons - Theme Toggle and Language */}
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleLanguagePress}
          >
            <Languages size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={toggleTheme}
          >
            {theme === 'light' ? 
              <Moon size={20} color={colors.text} /> : 
              <Sun size={20} color={colors.text} />
            }
          </TouchableOpacity>
        </View>
      </View>

      <FlyoutMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </>
  );
};

const HomeScreen = () => {
  const { getBusinessesInRadius, banners } = useBusiness();
  const { getLocation } = useLocationMock();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);
  const featuredBusinesses = getBusinessesInRadius().slice(0, 4);

  const categories: Category[] = [
    { 
      name: t('restaurants'), 
      icon: <Store size={24} color="#dc2626" />, 
      color: 'bg-red-100 text-red-600' 
    },
    { 
      name: t('services'), 
      icon: <Users size={24} color="#2563eb" />, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      name: t('shopping'), 
      icon: <Award size={24} color="#16a34a" />, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      name: t('beauty'), 
      icon: <Zap size={24} color="#9333ea" />, 
      color: 'bg-purple-100 text-purple-600' 
    },
  ];

  const handleLocationClick = () => {
    getLocation();
    navigation.navigate('NearMe');
  };

  const handleSearchSubmit = () => {
    toast({ title: "Search initiated! Displaying results..." });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.heroSection}>
          <ImageCarousel images={banners.map(b => b.imageUrl)} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Animated.View 
              //entering={FadeInUp.duration(800)}
              style={styles.heroTextContainer}
            >
              <Text style={styles.heroTitle}>{t('heroTitle')}</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder={t('searchPlaceholder')}
                  placeholderTextColor={colors.textLight}
                  returnKeyType="search"
                  onSubmitEditing={handleSearchSubmit}
                />
                <TouchableOpacity 
                  style={styles.searchButton}
                  onPress={handleSearchSubmit}
                >
                  <Search size={20} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.locationButton}
                onPress={handleLocationClick}
              >
                <MapPin size={16} color="white" />
                <Text style={styles.locationButtonText}>{t('findNearMe')}</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('categories')}</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={category.name}
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Businesses')}
              >
                <Animated.View
                  //entering={FadeInDown.duration(600).delay(index * 100)}
                  style={[styles.categoryIcon, { backgroundColor: getCategoryColor(category.color) }]}
                >
                  {category.icon}
                </Animated.View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Businesses Section */}
        <View style={[styles.section, styles.featuredSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('featuredBusinesses')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Businesses')}>
              <Text style={styles.viewAllText}>{t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.businessesScroll}
          >
            <View style={styles.businessesContainer}>
              {featuredBusinesses.map((business, index) => (
                <Animated.View
                  key={business.id}
                  //entering={FadeInUp.duration(600).delay(index * 100)}
                >
                  <BusinessCard business={business} />
                </Animated.View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Additional Business Section */}
        <View style={[styles.section, styles.featuredSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('popularNearby')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Businesses')}>
              <Text style={styles.viewAllText}>{t('seeMore')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verticalBusinesses}>
            {getBusinessesInRadius().slice(1).map((business, index) => (
              <TouchableOpacity key={business.id} style={styles.verticalBusinessCard}>
                <Image
                  source={{ uri: business.imageUrl }}
                  style={styles.verticalBusinessImage}
                  resizeMode="cover"
                />
                <View style={styles.verticalBusinessInfo}>
                  <Text style={styles.verticalBusinessName}>{business.name}</Text>
                  <Text style={styles.verticalBusinessCategory}>{business.category}</Text>
                  <View style={styles.verticalRatingContainer}>
                    <Text style={styles.verticalRating}>⭐ {business.rating}</Text>
                    <Text style={styles.verticalDistance}>{business.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="Home" />
    </View>
  );
};

// Helper function to extract color from category string
const getCategoryColor = (colorString: string): string => {
  const colorMap: { [key: string]: string } = {
    'red': '#fecaca',
    'blue': '#dbeafe',
    'green': '#dcfce7',
    'purple': '#e9d5ff',
  };
  
  const colorKey = colorString.split('-')[1];
  return colorMap[colorKey] || '#f3f4f6';
};

// Create styles based on current theme colors
const createStyles = (colors: typeof LIGHT_COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 200,
  },
  logoContainer: {
    marginBottom: 2,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 12,
    color: colors.primaryDark,
    marginLeft: 4,
    maxWidth: 150,
    fontWeight: '600',
  },
  // Flyout Menu Styles
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: 300,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.primary,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  themeToggle: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  logoutItem: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ef4444',
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  // Language Page Styles
  languageContainer: {
    flex: 1,
    padding: 16,
  },
  languageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  backButton: {
    padding: 4,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: colors.textLight,
  },
  languageSelectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageSelectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  // Rest of the styles remain similar but use colors from the parameter
  heroSection: {
    height: 320,
    position: 'relative',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heroTextContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 12,
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    color: colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    position: 'absolute',
    right: 8,
    top: 6,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  locationButtonText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 20,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  section: {
    padding: 16,
  },
  featuredSection: {
    backgroundColor: colors.surface,
    marginVertical: 8,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    padding: 12,
    borderRadius: 25,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  businessesScroll: {
    marginHorizontal: -16,
  },
  businessesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  businessCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  businessImage: {
    width: '100%',
    height: 160,
  },
  businessInfo: {
    padding: 12,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
  },
  distance: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
  },
  verticalBusinesses: {
    gap: 12,
  },
  verticalBusinessCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  verticalBusinessImage: {
    width: 80,
    height: 80,
  },
  verticalBusinessInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  verticalBusinessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  verticalBusinessCategory: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  verticalRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalRating: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
  },
  verticalDistance: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
  },
});

// Main App Component with Providers
const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider defaultLanguage="en">
        <HomeScreen />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;

// For navigation setup, you would need to add these screens to your navigator:
// <Stack.Screen name="Language" component={LanguagePage} />
// <Stack.Screen name="Wishlist" component={WishlistPage} />
// <Stack.Screen name="Preferences" component={PreferencesPage} />
// <Stack.Screen name="Profile" component={ProfilePage} />