import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';

// Define available languages
export type Language = 'en' | 'kn' | 'hi' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh' | 'ar' | 'pt' | 'it';

// Translation strings for all languages
export const translations = {
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
    currentLanguage: 'Current Language',
    english: 'English',
    kannada: 'Kannada',
    hindi: 'Hindi',
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    japanese: 'Japanese',
    korean: 'Korean',
    chinese: 'Chinese',
    arabic: 'Arabic',
    portuguese: 'Portuguese',
    italian: 'Italian',
    
    // Language Support Features
    languageSupport: 'Language Support',
    languageSupportText: 'Our app supports multiple languages with full translation, RTL support for languages like Arabic, and native font rendering.',
    fullAppTranslation: 'Full app translation',
    rtlSupport: 'RTL (Right-to-Left) support',
    nativeFonts: 'Native font rendering',
    
    // Theme
    light: 'Light',
    dark: 'Dark',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    apply: 'Apply',
    reset: 'Reset',
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
    currentLanguage: 'ಪ್ರಸ್ತುತ ಭಾಷೆ',
    english: 'ಇಂಗ್ಲಿಷ್',
    kannada: 'ಕನ್ನಡ',
    hindi: 'ಹಿಂದಿ',
    spanish: 'ಸ್ಪ್ಯಾನಿಷ್',
    french: 'ಫ್ರೆಂಚ್',
    german: 'ಜರ್ಮನ್',
    japanese: 'ಜಾಪನೀಸ್',
    korean: 'ಕೊರಿಯನ್',
    chinese: 'ಚೈನೀಸ್',
    arabic: 'ಅರಬ್ಬಿ',
    portuguese: 'ಪೋರ್ಚುಗೀಸ್',
    italian: 'ಇಟಾಲಿಯನ್',
    
    // Language Support Features
    languageSupport: 'ಭಾಷೆ ಬೆಂಬಲ',
    languageSupportText: 'ನಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಪೂರ್ಣ ಅನುವಾದ, ಅರಬ್ಬಿಯಂತಹ ಭಾಷೆಗಳಿಗೆ ಆರ್‌ಟಿಎಲ್ ಬೆಂಬಲ ಮತ್ತು ಸ್ಥಳೀಯ ಫಾಂಟ್ ರೆಂಡರಿಂಗ್‌ನೊಂದಿಗೆ ಬಹು ಭಾಷೆಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ.',
    fullAppTranslation: 'ಪೂರ್ಣ ಅಪ್ಲಿಕೇಶನ್ ಅನುವಾದ',
    rtlSupport: 'ಆರ್‌ಟಿಎಲ್ (ಬಲದಿಂದ-ಎಡಕ್ಕೆ) ಬೆಂಬಲ',
    nativeFonts: 'ಸ್ಥಳೀಯ ಫಾಂಟ್ ರೆಂಡರಿಂಗ್',
    
    // Theme
    light: 'ಬೆಳಕು',
    dark: 'ಗಾಢ',
    
    // Common
    save: 'ಉಳಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    ok: 'ಸರಿ',
    yes: 'ಹೌದು',
    no: 'ಇಲ್ಲ',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    error: 'ತಪ್ಪಾಗಿದೆ',
    success: 'ಯಶಸ್ವಿ',
    warning: 'ಎಚ್ಚರಿಕೆ',
    search: 'ಹುಡುಕಿ',
    filter: 'ಫಿಲ್ಟರ್',
    sort: 'ವಿಂಗಡಿಸಿ',
    apply: 'ಅನ್ವಯಿಸು',
    reset: 'ಮರುಹೊಂದಿಸಿ',
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
    currentLanguage: 'वर्तमान भाषा',
    english: 'अंग्रेजी',
    kannada: 'कन्नड़',
    hindi: 'हिन्दी',
    spanish: 'स्पेनिश',
    french: 'फ्रेंच',
    german: 'जर्मन',
    japanese: 'जापानी',
    korean: 'कोरियन',
    chinese: 'चीनी',
    arabic: 'अरबी',
    portuguese: 'पुर्तगाली',
    italian: 'इतालवी',
    
    // Language Support Features
    languageSupport: 'भाषा सहायता',
    languageSupportText: 'हमारा ऐप पूर्ण अनुवाद, अरबी जैसी भाषाओं के लिए आरटीएल सहायता और देशी फ़ॉन्ट रेंडरिंग के साथ कई भाषाओं का समर्थन करता है।',
    fullAppTranslation: 'पूर्ण ऐप अनुवाद',
    rtlSupport: 'आरटीएल (दाएं-से-बाएं) सहायता',
    nativeFonts: 'देशी फ़ॉन्ट रेंडरिंग',
    
    // Theme
    light: 'लाइट',
    dark: 'डार्क',
    
    // Common
    save: 'सहेजें',
    cancel: 'रद्द करें',
    ok: 'ठीक',
    yes: 'हाँ',
    no: 'नहीं',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफल',
    warning: 'चेतावनी',
    search: 'खोज',
    filter: 'फिल्टर',
    sort: 'क्रमबद्ध करें',
    apply: 'लागू करें',
    reset: 'रीसेट',
  },
  es: {
    appName: 'LocalFind',
    currentLocation: 'Nueva York, NY',
    menu: 'Menú',
    home: 'Inicio',
    wishlist: 'Favoritos',
    preferences: 'Mis Preferencias',
    profile: 'Perfil',
    logout: 'Cerrar Sesión',
    language: 'Idioma',
    theme: 'Tema',
    businesses: 'Negocios',
    setLocation: 'Establecer Ubicación',
    recent: 'Reciente',
    profileSettings: 'Perfil',
    heroTitle: 'Encuentra Cualquier Cosa, Localmente.',
    searchPlaceholder: 'Buscar negocios, servicios...',
    findNearMe: 'Encontrar Cerca de Mí',
    categories: 'Categorías',
    featuredBusinesses: 'Negocios Destacados',
    popularNearby: 'Popular Cercano',
    viewAll: 'Ver Todo',
    seeMore: 'Ver Más',
    restaurants: 'Restaurantes',
    services: 'Servicios',
    shopping: 'Compras',
    beauty: 'Belleza',
    chooseLanguage: 'Elegir Idioma',
    currentLanguage: 'Idioma Actual',
    english: 'Inglés',
    kannada: 'Canarés',
    hindi: 'Hindi',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    japanese: 'Japonés',
    korean: 'Coreano',
    chinese: 'Chino',
    arabic: 'Árabe',
    portuguese: 'Portugués',
    italian: 'Italiano',
  },
  fr: {
    appName: 'LocalFind',
    currentLocation: 'New York, NY',
    menu: 'Menu',
    home: 'Accueil',
    wishlist: 'Liste de Souhaits',
    preferences: 'Mes Préférences',
    profile: 'Profil',
    logout: 'Déconnexion',
    language: 'Langue',
    theme: 'Thème',
    businesses: 'Entreprises',
    setLocation: 'Définir la Localisation',
    recent: 'Récent',
    profileSettings: 'Profil',
    heroTitle: 'Trouvez Tout, Localement.',
    searchPlaceholder: 'Rechercher des entreprises, services...',
    findNearMe: 'Trouver près de moi',
    categories: 'Catégories',
    featuredBusinesses: 'Entreprises en Vedette',
    popularNearby: 'Populaire à Proximité',
    viewAll: 'Voir Tout',
    seeMore: 'Voir Plus',
    restaurants: 'Restaurants',
    services: 'Services',
    shopping: 'Shopping',
    beauty: 'Beauté',
    chooseLanguage: 'Choisir la Langue',
    currentLanguage: 'Langue Actuelle',
    english: 'Anglais',
    kannada: 'Kannada',
    hindi: 'Hindi',
    spanish: 'Espagnol',
    french: 'Français',
    german: 'Allemand',
    japanese: 'Japonais',
    korean: 'Coréen',
    chinese: 'Chinois',
    arabic: 'Arabe',
    portuguese: 'Portugais',
    italian: 'Italien',
  },
  de: {
    appName: 'LocalFind',
    currentLocation: 'New York, NY',
    menu: 'Menü',
    home: 'Startseite',
    wishlist: 'Wunschliste',
    preferences: 'Meine Einstellungen',
    profile: 'Profil',
    logout: 'Abmelden',
    language: 'Sprache',
    theme: 'Thema',
    businesses: 'Unternehmen',
    setLocation: 'Standort Festlegen',
    recent: 'Kürzlich',
    profileSettings: 'Profil',
    heroTitle: 'Finden Sie Alles, Lokal.',
    searchPlaceholder: 'Unternehmen, Dienstleistungen suchen...',
    findNearMe: 'In Meiner Nähe Finden',
    categories: 'Kategorien',
    featuredBusinesses: 'Ausgewählte Unternehmen',
    popularNearby: 'Beliebt in der Nähe',
    viewAll: 'Alle Anzeigen',
    seeMore: 'Mehr Anzeigen',
    restaurants: 'Restaurants',
    services: 'Dienstleistungen',
    shopping: 'Einkaufen',
    beauty: 'Schönheit',
    chooseLanguage: 'Sprache Auswählen',
    currentLanguage: 'Aktuelle Sprache',
    english: 'Englisch',
    kannada: 'Kannada',
    hindi: 'Hindi',
    spanish: 'Spanisch',
    french: 'Französisch',
    german: 'Deutsch',
    japanese: 'Japanisch',
    korean: 'Koreanisch',
    chinese: 'Chinesisch',
    arabic: 'Arabisch',
    portuguese: 'Portugiesisch',
    italian: 'Italienisch',
  },
  ja: {
    appName: 'ローカルファインド',
    currentLocation: 'ニューヨーク, NY',
    menu: 'メニュー',
    home: 'ホーム',
    wishlist: 'ウィッシュリスト',
    preferences: 'マイ設定',
    profile: 'プロフィール',
    logout: 'ログアウト',
    language: '言語',
    theme: 'テーマ',
    businesses: 'ビジネス',
    setLocation: '場所を設定',
    recent: '最近',
    profileSettings: 'プロフィール',
    heroTitle: '何でも地元で見つけよう。',
    searchPlaceholder: 'ビジネス、サービスを検索...',
    findNearMe: '近くを検索',
    categories: 'カテゴリ',
    featuredBusinesses: '注目のビジネス',
    popularNearby: '近くの人気',
    viewAll: 'すべて表示',
    seeMore: 'もっと見る',
    restaurants: 'レストラン',
    services: 'サービス',
    shopping: 'ショッピング',
    beauty: '美容',
    chooseLanguage: '言語を選択',
    currentLanguage: '現在の言語',
    english: '英語',
    kannada: 'カンナダ語',
    hindi: 'ヒンディー語',
    spanish: 'スペイン語',
    french: 'フランス語',
    german: 'ドイツ語',
    japanese: '日本語',
    korean: '韓国語',
    chinese: '中国語',
    arabic: 'アラビア語',
    portuguese: 'ポルトガル語',
    italian: 'イタリア語',
  },
  ko: {
    appName: '로컬파인드',
    currentLocation: '뉴욕, NY',
    menu: '메뉴',
    home: '홈',
    wishlist: '위시리스트',
    preferences: '내 설정',
    profile: '프로필',
    logout: '로그아웃',
    language: '언어',
    theme: '테마',
    businesses: '비즈니스',
    setLocation: '위치 설정',
    recent: '최근',
    profileSettings: '프로필',
    heroTitle: '로컬에서 무엇이든 찾아보세요.',
    searchPlaceholder: '비즈니스, 서비스 검색...',
    findNearMe: '내 주변 찾기',
    categories: '카테고리',
    featuredBusinesses: '추천 비즈니스',
    popularNearby: '주변 인기',
    viewAll: '모두 보기',
    seeMore: '더보기',
    restaurants: '레스토랑',
    services: '서비스',
    shopping: '쇼핑',
    beauty: '뷰티',
    chooseLanguage: '언어 선택',
    currentLanguage: '현재 언어',
    english: '영어',
    kannada: '칸나다어',
    hindi: '힌디어',
    spanish: '스페인어',
    french: '프랑스어',
    german: '독일어',
    japanese: '일본어',
    korean: '한국어',
    chinese: '중국어',
    arabic: '아랍어',
    portuguese: '포르투갈어',
    italian: '이탈리아어',
  },
  zh: {
    appName: '本地发现',
    currentLocation: '纽约, NY',
    menu: '菜单',
    home: '首页',
    wishlist: '收藏列表',
    preferences: '我的偏好',
    profile: '个人资料',
    logout: '退出登录',
    language: '语言',
    theme: '主题',
    businesses: '商家',
    setLocation: '设置位置',
    recent: '最近',
    profileSettings: '个人资料',
    heroTitle: '本地发现，无所不找。',
    searchPlaceholder: '搜索商家、服务...',
    findNearMe: '查找附近',
    categories: '分类',
    featuredBusinesses: '精选商家',
    popularNearby: '附近热门',
    viewAll: '查看全部',
    seeMore: '查看更多',
    restaurants: '餐厅',
    services: '服务',
    shopping: '购物',
    beauty: '美容',
    chooseLanguage: '选择语言',
    currentLanguage: '当前语言',
    english: '英语',
    kannada: '卡纳达语',
    hindi: '印地语',
    spanish: '西班牙语',
    french: '法语',
    german: '德语',
    japanese: '日语',
    korean: '韩语',
    chinese: '中文',
    arabic: '阿拉伯语',
    portuguese: '葡萄牙语',
    italian: '意大利语',
  },
  ar: {
    appName: 'لوكال فايند',
    currentLocation: 'نيويورك, NY',
    menu: 'القائمة',
    home: 'الرئيسية',
    wishlist: 'قائمة الرغبات',
    preferences: 'تفضيلاتي',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
    language: 'اللغة',
    theme: 'السمة',
    businesses: 'الشركات',
    setLocation: 'تعيين الموقع',
    recent: 'حديث',
    profileSettings: 'الملف الشخصي',
    heroTitle: 'ابحث عن أي شيء، محليًا.',
    searchPlaceholder: 'ابحث عن الشركات والخدمات...',
    findNearMe: 'البحث بالقرب مني',
    categories: 'الفئات',
    featuredBusinesses: 'الشركات المميزة',
    popularNearby: 'شائع بالقرب منك',
    viewAll: 'عرض الكل',
    seeMore: 'عرض المزيد',
    restaurants: 'مطاعم',
    services: 'خدمات',
    shopping: 'تسوق',
    beauty: 'جمال',
    chooseLanguage: 'اختر اللغة',
    currentLanguage: 'اللغة الحالية',
    english: 'الإنجليزية',
    kannada: 'الكانادا',
    hindi: 'الهندية',
    spanish: 'الإسبانية',
    french: 'الفرنسية',
    german: 'الألمانية',
    japanese: 'اليابانية',
    korean: 'الكورية',
    chinese: 'الصينية',
    arabic: 'العربية',
    portuguese: 'البرتغالية',
    italian: 'الإيطالية',
  },
  pt: {
    appName: 'LocalFind',
    currentLocation: 'Nova York, NY',
    menu: 'Menu',
    home: 'Início',
    wishlist: 'Lista de Desejos',
    preferences: 'Minhas Preferências',
    profile: 'Perfil',
    logout: 'Sair',
    language: 'Idioma',
    theme: 'Tema',
    businesses: 'Empresas',
    setLocation: 'Definir Localização',
    recent: 'Recente',
    profileSettings: 'Perfil',
    heroTitle: 'Encontre Tudo, Localmente.',
    searchPlaceholder: 'Pesquisar empresas, serviços...',
    findNearMe: 'Encontrar Perto de Mim',
    categories: 'Categorias',
    featuredBusinesses: 'Empresas em Destaque',
    popularNearby: 'Popular Próximo',
    viewAll: 'Ver Tudo',
    seeMore: 'Ver Mais',
    restaurants: 'Restaurantes',
    services: 'Serviços',
    shopping: 'Compras',
    beauty: 'Beleza',
    chooseLanguage: 'Escolher Idioma',
    currentLanguage: 'Idioma Atual',
    english: 'Inglês',
    kannada: 'Canarês',
    hindi: 'Hindi',
    spanish: 'Espanhol',
    french: 'Francês',
    german: 'Alemão',
    japanese: 'Japonês',
    korean: 'Coreano',
    chinese: 'Chinês',
    arabic: 'Árabe',
    portuguese: 'Português',
    italian: 'Italiano',
  },
  it: {
    appName: 'LocalFind',
    currentLocation: 'New York, NY',
    menu: 'Menu',
    home: 'Home',
    wishlist: 'Lista Desideri',
    preferences: 'Le Mie Preferenze',
    profile: 'Profilo',
    logout: 'Disconnetti',
    language: 'Lingua',
    theme: 'Tema',
    businesses: 'Aziende',
    setLocation: 'Imposta Posizione',
    recent: 'Recente',
    profileSettings: 'Profilo',
    heroTitle: 'Trova Qualsiasi Cosa, Localmente.',
    searchPlaceholder: 'Cerca aziende, servizi...',
    findNearMe: 'Trova Vicino a Me',
    categories: 'Categorie',
    featuredBusinesses: 'Aziende in Evidenza',
    popularNearby: 'Popolare Nelle Vicinanze',
    viewAll: 'Vedi Tutto',
    seeMore: 'Vedi Altro',
    restaurants: 'Ristoranti',
    services: 'Servizi',
    shopping: 'Shopping',
    beauty: 'Bellezza',
    chooseLanguage: 'Scegli Lingua',
    currentLanguage: 'Lingua Corrente',
    english: 'Inglese',
    kannada: 'Kannada',
    hindi: 'Hindi',
    spanish: 'Spagnolo',
    french: 'Francese',
    german: 'Tedesco',
    japanese: 'Giapponese',
    korean: 'Coreano',
    chinese: 'Cinese',
    arabic: 'Arabo',
    portuguese: 'Portoghese',
    italian: 'Italiano',
  }
};

// Language metadata
export const languageMetadata = {
  en: { name: 'English', native: 'English', flag: '🇺🇸', direction: 'ltr' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', direction: 'ltr' },
  hi: { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
  es: { name: 'Spanish', native: 'Español', flag: '🇪🇸', direction: 'ltr' },
  fr: { name: 'French', native: 'Français', flag: '🇫🇷', direction: 'ltr' },
  de: { name: 'German', native: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  ja: { name: 'Japanese', native: '日本語', flag: '🇯🇵', direction: 'ltr' },
  ko: { name: 'Korean', native: '한국어', flag: '🇰🇷', direction: 'ltr' },
  zh: { name: 'Chinese', native: '中文', flag: '🇨🇳', direction: 'ltr' },
  ar: { name: 'Arabic', native: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  pt: { name: 'Portuguese', native: 'Português', flag: '🇵🇹', direction: 'ltr' },
  it: { name: 'Italian', native: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
};

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: typeof languageMetadata;
  currentLanguageMetadata: typeof languageMetadata[Language];
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider Component
interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Load saved language preference on mount
  useEffect(() => {
    // In a real app, you would load from AsyncStorage or similar
    const loadLanguagePreference = async () => {
      try {
        // Simulate loading from storage
        // const savedLanguage = await AsyncStorage.getItem('app-language');
        // if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        //   setLanguageState(savedLanguage as Language);
        // }
      } catch (error) {
        console.log('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, []);

  // Set language with side effects
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    // Update RTL settings for RTL languages
    if (newLanguage === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    // Save to storage (in a real app)
    // AsyncStorage.setItem('app-language', newLanguage).catch(console.error);
  };

  // Translation function
  const t = (key: string): string => {
    const translation = translations[language];
    if (!translation) {
      console.warn(`Translation not found for language: ${language}`);
      return (translations.en as Record<string, string>)[key] || key;
    }

    return (translation as Record<string, string>)[key] ||
           (translations.en as Record<string, string>)[key] ||
           key;
  };

  // Get current language metadata
  const currentLanguageMetadata = languageMetadata[language];

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages: languageMetadata,
    currentLanguageMetadata,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to get language name
export const getLanguageName = (code: Language): string => {
  return languageMetadata[code]?.name || code;
};

// Helper function to get language native name
export const getLanguageNativeName = (code: Language): string => {
  return languageMetadata[code]?.native || code;
};

// Helper function to check if language is RTL
export const isRTL = (code: Language): boolean => {
  return languageMetadata[code]?.direction === 'rtl';
};

// Export the context for class components (if needed)
export { LanguageContext };

export default LanguageProvider;