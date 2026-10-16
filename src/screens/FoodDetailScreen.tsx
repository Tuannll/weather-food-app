import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RootStackNavigationProp, RootStackRouteProp } from '../navigation/types';
import { getFoodByName } from '../utils/foodCatalog';
import { toFoodItem } from '../utils/foodSuggestions';

export default function FoodDetailScreen() {
  const navigation = useNavigation<RootStackNavigationProp<'FoodDetail'>>();
  const route = useRoute<RootStackRouteProp<'FoodDetail'>>();
  const food = getFoodByName(route.params.foodName);

  if (!food) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy món ăn</Text>
        <Button title="Về Trang chủ" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  const selectedFood = toFoodItem(food);

  return (
    <View style={styles.container}>
      <Image source={selectedFood.image} style={styles.image} accessibilityLabel={`Ảnh ${selectedFood.name}`} />
      <Text style={styles.name}>{selectedFood.name}</Text>
      <Text style={styles.description}>{selectedFood.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Quay lại Trang chủ" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  errorText: { fontSize: 16, marginBottom: 20, color: '#666' },
  image: { width: 200, height: 200, borderRadius: 100, marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  description: { fontSize: 18, color: '#444', textAlign: 'center', lineHeight: 28 },
  buttonContainer: { marginTop: 40, width: '100%', paddingHorizontal: 20 },
});
