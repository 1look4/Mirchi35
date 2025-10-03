import { Cake, ChefHat, Coffee, Cookie, ScrollText, Soup, ToolCase, UtensilsCrossed, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

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
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-[#FF6B2C] px-4 py-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold">Mirchi Bajji</Text>
          <TouchableOpacity>
            <X color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View className="flex-1 p-4">
          <View className="flex-row flex-wrap gap-4">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.name);
              const IconComponent = category.icon;
              
              return (
                <TouchableOpacity
                  key={category.id}
                  className={`basis-[30%] aspect-square items-center justify-center rounded-full ${
                    isSelected ? 'bg-[#FF6B2C]/10' : 'bg-[#E8F1FF]'
                  }`}
                  onPress={() => toggleCategory(category.name)}
                >
                  <View className="items-center">
                    <IconComponent
                      size={28}
                      color={isSelected ? '#FF6B2C' : '#666666'}
                    />
                    <Text
                      className={`text-center mt-2 text-xs ${
                        isSelected ? 'text-[#FF6B2C]' : 'text-gray-600'
                      }`}
                      numberOfLines={2}
                    >
                      {category.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Proceed Button */}
        <View className="p-4">
          <TouchableOpacity 
            className="bg-[#FF6B2C] py-4 rounded-full"
            onPress={() => console.log('Selected categories:', selectedCategories)}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}