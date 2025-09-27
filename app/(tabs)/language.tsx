import { useLanguage } from '@/components/LanguageContext';
import { useTheme } from '@/components/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Check, ChevronLeft, Globe } from 'lucide-react-native';
import React from 'react';
import {
  I18nManager,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Language: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const LanguagePage = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const resolvedTheme = theme === 'auto' ? 'light' : theme;
  const colors = getColors(resolvedTheme);
  const styles = createStyles(colors);

  const languages = [
    {
      code: 'en' as const,
      name: t('english'),
      native: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    },
    {
      code: 'kn' as const,
      name: t('kannada'),
      native: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    {
      code: 'hi' as const,
      name: t('hindi'),
      native: 'हिन्दी',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    {
      code: 'es' as const,
      name: 'Spanish',
      native: 'Español',
      flag: '🇪🇸',
      direction: 'ltr'
    },
    {
      code: 'fr' as const,
      name: 'French',
      native: 'Français',
      flag: '🇫🇷',
      direction: 'ltr'
    },
    {
      code: 'de' as const,
      name: 'German',
      native: 'Deutsch',
      flag: '🇩🇪',
      direction: 'ltr'
    },
    {
      code: 'ja' as const,
      name: 'Japanese',
      native: '日本語',
      flag: '🇯🇵',
      direction: 'ltr'
    },
    {
      code: 'ko' as const,
      name: 'Korean',
      native: '한국어',
      flag: '🇰🇷',
      direction: 'ltr'
    },
    {
      code: 'zh' as const,
      name: 'Chinese',
      native: '中文',
      flag: '🇨🇳',
      direction: 'ltr'
    },
    {
      code: 'ar' as const,
      name: 'Arabic',
      native: 'العربية',
      flag: '🇸🇦',
      direction: 'rtl'
    },
    {
      code: 'pt' as const,
      name: 'Portuguese',
      native: 'Português',
      flag: '🇵🇹',
      direction: 'ltr'
    },
    {
      code: 'it' as const,
      name: 'Italian',
      native: 'Italiano',
      flag: '🇮🇹',
      direction: 'ltr'
    }
  ];

  const handleLanguageSelect = (langCode: typeof languages[0]['code']) => {
    setLanguage(langCode);
    
    // Change app direction for RTL languages
    if (langCode === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    
    // Navigate back after a short delay
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const getLanguageFamily = (code: string) => {
    const families = {
      'en': 'Germanic',
      'de': 'Germanic',
      'es': 'Romance',
      'fr': 'Romance',
      'it': 'Romance',
      'pt': 'Romance',
      'hi': 'Indo-Aryan',
      'kn': 'Dravidian',
      'ja': 'Japonic',
      'ko': 'Koreanic',
      'zh': 'Sinitic',
      'ar': 'Semitic'
    };
    return families[code as keyof typeof families] || 'Other';
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor={colors.surface} 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Globe size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>{t('chooseLanguage')}</Text>
        </View>
        
        <View style={styles.headerRight} />
      </View>

      {/* Current Language Banner */}
      <View style={styles.currentLanguageBanner}>
        <Text style={styles.currentLanguageText}>
          {t('currentLanguage')}: 
        </Text>
        <Text style={styles.currentLanguageName}>
          {languages.find(lang => lang.code === language)?.native} ({language.toUpperCase()})
        </Text>
      </View>

      {/* Language List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.languagesGrid}>
          {languages.map((lang, index) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageCard,
                language === lang.code && styles.languageCardActive
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <View style={styles.languageHeader}>
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <View style={styles.languageTextContainer}>
                  <Text style={styles.languageName}>{lang.native}</Text>
                  <Text style={styles.languageEnglishName}>{lang.name}</Text>
                </View>
              </View>
              
              <View style={styles.languageDetails}>
                <Text style={styles.languageCode}>{lang.code.toUpperCase()}</Text>
                <Text style={styles.languageFamily}>
                  {getLanguageFamily(lang.code)}
                </Text>
              </View>

              {language === lang.code && (
                <View style={styles.selectedIndicator}>
                  <Check size={20} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>{t('languageSupport')}</Text>
          <Text style={styles.infoText}>
            {t('languageSupportText')}
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.featureText}>{t('fullAppTranslation')}</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureDot, { backgroundColor: colors.secondary }]} />
              <Text style={styles.featureText}>{t('rtlSupport')}</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.featureText}>{t('nativeFonts')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Color palettes
const LIGHT_COLORS = {
  primary: '#dc2626',
  primaryLight: '#fecaca',
  primaryDark: '#b91c1c',
  secondary: '#f59e0b',
  accent: '#16a34a',
  background: '#fef7ed',
  surface: '#ffffff',
  text: '#1f2937',
  textLight: '#6b7280',
  border: '#e5e7eb',
  card: '#ffffff',
};

const DARK_COLORS = {
  primary: '#ef4444',
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

const getColors = (theme: 'light' | 'dark') => theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

const createStyles = (colors: typeof LIGHT_COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerRight: {
    width: 40,
  },
  currentLanguageBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    gap: 8,
  },
  currentLanguageText: {
    fontSize: 14,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  currentLanguageName: {
    fontSize: 16,
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  languagesGrid: {
    gap: 12,
    marginBottom: 24,
  },
  languageCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  languageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  languageEnglishName: {
    fontSize: 14,
    color: colors.textLight,
  },
  languageDetails: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  languageCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  languageFamily: {
    fontSize: 11,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  selectedIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
});

export default LanguagePage;