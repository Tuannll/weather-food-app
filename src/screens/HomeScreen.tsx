import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import { useWeatherQuery } from '../hooks/useWeatherQuery';
import { useWeatherStore } from '../hooks/useWeatherStore';
import { RootStackNavigationProp } from '../navigation/types';
import { FoodItem, getFoodSuggestions } from '../utils/foodSuggestions';
import { requestLocationPermission } from '../utils/locationPermission';

const HANOI_COORDINATES = { latitude: 21.0285, longitude: 105.8542 };

export default function HomeScreen() {
  const navigation = useNavigation<RootStackNavigationProp<'Home'>>();
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [usesFallbackLocation, setUsesFallbackLocation] = useState(false);
  const { data, error, isLoading, isError, refetch } = useWeatherQuery(coordinates?.latitude ?? null, coordinates?.longitude ?? null);
  const setWeather = useWeatherStore((state) => state.setWeather);

  const loadLocation = useCallback(async () => {
    setIsLocating(true);
    setUsesFallbackLocation(false);

    const permission = await requestLocationPermission();
    if (permission.granted) {
      try {
        const location = await Location.getCurrentPositionAsync({});
        setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setIsLocating(false);
        return;
      } catch {
        // Use predictable demo location when device location cannot resolve.
      }
    }

    setCoordinates(HANOI_COORDINATES);
    setUsesFallbackLocation(true);
    setIsLocating(false);
  }, []);

  useEffect(() => {
    void loadLocation();
  }, [loadLocation]);

  useEffect(() => {
    if (data) setWeather(data);
  }, [data, setWeather]);

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Xem chi tiết ${item.name}`}
      accessibilityHint="Mở màn hình chi tiết món ăn"
      style={styles.card}
      onPress={() => navigation.navigate('FoodDetail', { foodName: item.name })}
    >
      <Image source={item.image} style={styles.image} accessibilityLabel={`Ảnh ${item.name}`} />
      <View style={styles.cardInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <Button title="Cài đặt Mock Mode" accessibilityLabel="Mở cài đặt Mock Mode" onPress={() => navigation.navigate('Settings')} />
      </View>

      {isLocating || isLoading ? <ActivityIndicator accessibilityLabel="Đang tải thời tiết" size="large" color="#0057B8" style={styles.loader} /> : null}

      {usesFallbackLocation ? <Text style={styles.notice}>Đang dùng vị trí mặc định: Hà Nội.</Text> : null}

      {isError && !isLoading ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error.message}</Text>
          <Button title="Thử lại thời tiết" accessibilityLabel="Thử tải lại thời tiết" onPress={() => void refetch()} />
          <View style={styles.retryLocation}>
            <Button title="Thử lại vị trí" accessibilityLabel="Thử lấy lại vị trí" onPress={() => void loadLocation()} />
          </View>
        </View>
      ) : null}

      {data && !isLoading && !isLocating ? (
        <>
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherTitle}>Thời tiết hiện tại</Text>
            <Text style={styles.weatherIcon}>{data.icon}</Text>
            <Text style={styles.weatherTemp}>{data.temperature}°C - {data.label}</Text>
            <Text style={styles.weatherDesc}>{data.description}</Text>
            <Text style={styles.weatherDetails}>Độ ẩm: {data.humidity}% | Gió: {data.windSpeed} km/h</Text>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Gợi ý món ăn</Text>
            <FlatList
              data={getFoodSuggestions(data).foods}
              keyExtractor={(item) => item.name}
              renderItem={renderFoodItem}
              contentContainerStyle={styles.list}
            />
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  headerButtons: { padding: 10, backgroundColor: '#fff', elevation: 2 },
  loader: { marginTop: 20 },
  center: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  errorText: { color: '#B42318', marginBottom: 10, textAlign: 'center' },
  notice: { color: '#5C3B00', backgroundColor: '#FFF4D6', padding: 10, textAlign: 'center' },
  retryLocation: { marginTop: 8 },
  weatherContainer: { padding: 20, alignItems: 'center', backgroundColor: '#fff', marginBottom: 10, elevation: 1 },
  weatherTitle: { fontSize: 18, fontWeight: 'bold' },
  weatherIcon: { fontSize: 60, marginVertical: 10 },
  weatherTemp: { fontSize: 24, fontWeight: 'bold' },
  weatherDesc: { color: '#424242', marginTop: 5, fontSize: 16 },
  weatherDetails: { color: '#333', marginTop: 5 },
  listContainer: { flex: 1 },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20, marginVertical: 10 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  cardInfo: { flex: 1, justifyContent: 'center' },
  foodName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  foodDesc: { color: '#424242' },
});
