import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Business = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  description: string;
  imageUrl: string;
  images?: string[];
  pin?: { x: number; y: number };
};

export default function Home() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selected, setSelected] = useState<Business | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-320)).current;

  useEffect(() => {
    // animate menu when toggled
    Animated.timing(slideAnim, {
      toValue: menuVisible ? 0 : -320,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, slideAnim]);

  useEffect(() => {
    // Load local JSON data
    // Using require ensures bundler includes the file
    const data: Business[] = require('../data/businesses.json');
    setBusinesses(data);
  }, []);

  const openDetail = (b: Business) => {
    setSelected(b);
    setDetailVisible(true);
  };

  const closeDetail = () => {
    setDetailVisible(false);
    setSelected(null);
  };

  const onNavigate = () => {
    // Show small navigation overlay (mock)
    setNavVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5E6A3" />

      {/* Top header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerButton} onPress={() => setMenuVisible(true)}>
          <Text style={styles.headerButtonText}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.logoText}>🌶️ Mirchi 35</Text>
        </View>

        <View style={styles.headerRightGroup}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => (router as any).push('/SetLocation')}>
            <Text style={styles.headerIconText}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => (router as any).push('/search')}>
            <Text style={styles.headerIconText}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Flyout menu */}
      <Modal visible={menuVisible} transparent animationType="none">
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuVisible(false)}>
          <Animated.View style={[styles.flyoutMenu, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.flyoutHeader}>
              <Text style={styles.flyoutTitle}>Mirchi 35</Text>
            </View>
            <TouchableOpacity style={styles.flyoutItem} onPress={() => { setMenuVisible(false); (router as any).push('/CategoryScreen'); }}>
              <Text style={styles.flyoutText}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flyoutItem} onPress={() => { setMenuVisible(false); (router as any).push('/(tabs)/language'); }}>
              <Text style={styles.flyoutText}>Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flyoutItem} onPress={() => { setMenuVisible(false); (router as any).push('/settings'); }}>
              <Text style={styles.flyoutText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flyoutItem} onPress={() => { setMenuVisible(false); (router as any).push('/profile'); }}>
              <Text style={styles.flyoutText}>Profile</Text>
            </TouchableOpacity>
            <View style={styles.flyoutDivider} />
            <TouchableOpacity style={styles.flyoutItem} onPress={() => { setMenuVisible(false); (router as any).replace('/login'); }}>
              <Text style={styles.flyoutText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>

      {/* Map area (top 50%) */}
      <View style={styles.mapArea}>
        <View style={styles.mapBackground}>
          {/* Soft map background - placeholder colored view */}
        </View>
        {/* Render pins from businesses */}
        {businesses.map((b) => (
          <View
            key={b.id}
            style={[
              styles.pin,
              {
                left: (b.pin?.x ?? 50) / 100 * width - 12,
                top: ((b.pin?.y ?? 30) / 100) * (height * 0.5) - 12,
              },
            ]}
          />
        ))}
      </View>

      {/* Cards / horizontal list */}
      <View style={styles.cardsArea}>
        <Text style={styles.sectionTitle}>Featured Businesses</Text>
        <FlatList
          data={businesses}
          keyExtractor={(i) => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => openDetail(item)} activeOpacity={0.9}>
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardAddress}>{item.address}</Text>
                <Text numberOfLines={2} style={styles.cardDesc}>{item.description}</Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.visitButton} onPress={() => openDetail(item)}>
                    <Text style={styles.visitText}>Visit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Detail modal with glassmorphism content */}
      <Modal visible={detailVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Top 40% images */}
            <View style={styles.detailImageArea}>
              <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {selected?.images?.length ? selected.images.map((img) => (
                  <Image key={img} source={{ uri: img }} style={styles.detailImage} />
                )) : (
                  <Image source={{ uri: selected?.imageUrl }} style={styles.detailImage} />
                )}
              </ScrollView>
            </View>

            {/* Glass card */}
            <View style={styles.glassCard}>
              <Text style={styles.detailTitle}>{selected?.name}</Text>
              <Text style={styles.detailAddress}>{selected?.address}</Text>
              <Text style={styles.detailDesc}>{selected?.description}</Text>

              <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <TouchableOpacity style={styles.navigateButton} onPress={onNavigate}>
                  <Text style={styles.navigateText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={closeDetail}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Navigation small overlay */}
      <Modal visible={navVisible} animationType="fade" transparent>
        <Pressable style={styles.navOverlay} onPress={() => setNavVisible(false)}>
          <View style={styles.navCard}>
            <Text style={styles.navTitle}>Navigation</Text>
            <Text style={styles.navText}>Pretend this is a map and directions to {selected?.name}</Text>
            <TouchableOpacity style={styles.navClose} onPress={() => setNavVisible(false)}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6A3',
  },
  /* Header / flyout styles */
  headerBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  headerButtonText: {
    fontSize: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#C62828',
  },
  headerRightGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
  },
  headerIconText: { fontSize: 18 },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  flyoutMenu: {
    width: 300,
    height: '100%',
    backgroundColor: '#F5E6A3',
    paddingTop: 40,
    paddingHorizontal: 12,
    elevation: 8,
  },
  flyoutHeader: {
    backgroundColor: '#1B4F72',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  flyoutTitle: { fontSize: 20, fontWeight: '800', marginBottom: 12, color: '#FFF' },
  flyoutItem: { paddingVertical: 12 },
  flyoutText: { fontSize: 16, color: '#1B4F72' },
  flyoutDivider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 12 },
  mapArea: {
    height: '50%',
    backgroundColor: '#FDECCF',
    position: 'relative',
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FDECCF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  pin: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FB923C',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardsArea: {
    flex: 1,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#C62828',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    width: width * 0.8,
    marginRight: 12,
    borderRadius: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardBody: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B4F72',
  },
  cardAddress: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#374151',
    marginTop: 8,
  },
  cardActions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  visitButton: {
    backgroundColor: '#1B4F72',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  visitText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '85%',
    backgroundColor: 'transparent',
  },
  detailImageArea: {
    height: '40%',
    backgroundColor: '#eee',
  },
  detailImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  glassCard: {
    flex: 1,
    marginTop: -30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B4F72',
  },
  detailAddress: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 6,
  },
  detailDesc: {
    marginTop: 8,
    color: '#374151',
  },
  navigateButton: {
    backgroundColor: '#FB923C',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginRight: 12,
  },
  navigateText: {
    color: '#fff',
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: '#1B4F72',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  closeText: {
    color: '#fff',
    fontWeight: '700',
  },

  navOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navCard: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B4F72',
  },
  navText: {
    marginTop: 8,
    color: '#374151',
    textAlign: 'center',
  },
  navClose: {
    marginTop: 12,
    backgroundColor: '#1B4F72',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
});