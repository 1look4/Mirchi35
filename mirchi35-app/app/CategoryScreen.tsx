import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Import vector icons if using icons library, for example:
import { router } from 'expo-router';
import { Cake } from 'lucide-react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any other icon library you prefer


const categories = [
  { icon: 'temple-buddhist', label: 'Worship & Temples' },
  { icon: 'store', label: 'Pooja Shops' },
  { icon: 'school', label: 'Learning Centres' },
  { icon: 'book', label: 'Book Shops' },
  { icon: Cake, label: 'Foodie' },
  { icon: 'wine-bar', label: 'Wine and Drinks' },
  { icon: 'home', label: 'Lifestyle & Decor' },
  { icon: 'spa', label: 'Wellness' },
  { icon: 'shopping-bag', label: 'Fashion & Accessories' },
  { icon: 'ring', label: 'Jewelry' },
  { icon: 'checkroom', label: 'Cosmetics' },
  { icon: 'atm', label: 'ATM’s' },
  { icon: 'healing', label: 'Aushadh' },
  { icon: 'storefront', label: 'Stationery Shops' },
  { icon: 'library-books', label: 'Library' },
  { icon: 'stars', label: 'Astrology' },
  { icon: 'local-post-office', label: 'Post Office & Courier' },
  { icon: 'local-police', label: 'Police Station' },
  { icon: 'bloodtype', label: 'Blood Bank' },
  { icon: 'local-hospital', label: 'Hospitals & Clinics' },
];

  const handleNext = () => {
    // Add OTP login logic here
    console.log('To sub cat page');  
    (router as any).replace('/SecondaryCategoryScreen');


  };
export default function CategoryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mirchi Bajji</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            {/* <Icon name={category.icon} size={50} color="#5E5E5E" /> */}
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>


      <TouchableOpacity style={styles.proceedButton} onPress={handleNext}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF3C1', // Background color similar to the design
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D43F00', // Red chili color from the logo
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryCard: {
    width: '40%',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFEBB5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#5E5E5E',
  },
  proceedButton: {
    backgroundColor: '#4C8BF5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  proceedText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
