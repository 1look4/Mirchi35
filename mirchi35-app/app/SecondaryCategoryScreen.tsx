import { router } from 'expo-router';
import { Cake, ChefHat, Coffee, Cookie, ScrollText, Soup, ToolCase, UtensilsCrossed, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SecondaryCategoryScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 1, name: 'Chaats and Pani Puri', icon: ToolCase },
    { id: 2, name: 'Dosa and Idlis', icon: Coffee },
    { id: 3, name: 'Cakes & Desserts', icon: Cake },
    { id: 4, name: 'Sweets & Mithai', icon: Cookie },
    { id: 5, name: 'Chinese', icon: UtensilsCrossed },
    { id: 6, name: 'Rice Bowls and Biryanis', icon: ToolCase },
    { id: 7, name: 'Snacks Rolls & Wraps', icon: ScrollText },
    { id: 8, name: 'Thalis & Meals', icon: Soup },
    { id: 9, name: 'Luxury Dining', icon: ChefHat },
  ];

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName) ? prev.filter(cat => cat !== categoryName) : [...prev, categoryName]
    );
  };

  const handleNext = () => {
    // Add OTP login logic here
    console.log('To sub cat page');
    (router as any).replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mirchi 35</Text>
          <TouchableOpacity>
            <X color="white" size={20} />
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View style={styles.grid}>
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.name);
            const IconComponent = category.icon;

            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, isSelected ? styles.categoryCardSelected : null]}
                onPress={() => toggleCategory(category.name)}
              >
                <View style={styles.categoryInner}>
                  <IconComponent size={28} color={isSelected ? '#FF6B2C' : '#5E5E5E'} />
                  <Text style={[styles.categoryLabel, isSelected ? styles.categoryLabelSelected : null]} numberOfLines={2}>
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Proceed Button */}
        <View style={styles.proceedWrap}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleNext}>
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3C1',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6B2C',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  categoryCard: {
    width: '40%',
    alignItems: 'center',
    margin: 8,
    padding: 12,
    backgroundColor: '#FFEBB5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryCardSelected: {
    backgroundColor: '#FF6B2C20',
  },
  categoryInner: {
    alignItems: 'center',
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#5E5E5E',
  },
  categoryLabelSelected: {
    color: '#FF6B2C',
  },
  proceedWrap: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: '#4C8BF5',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
  },
  proceedText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});