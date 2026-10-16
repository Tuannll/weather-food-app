import type { MockWeatherItem } from '../mock/mockWeatherData';
import { getFoodsForCondition, type FoodMetadata } from './foodCatalog';

export interface FoodItem extends FoodMetadata {
  image: number;
}

export interface FoodSuggestionResult {
  condition: string;
  temperature: number;
  reason: string;
  foods: FoodItem[];
}

const foodImages: Record<string, number> = {
  goi_cuon_tom_thit: require('../../assets/foods/goi_cuon_tom_thit.jpg'),
  che_da_xanh: require('../../assets/foods/che_da_xanh.jpg'),
  bun_bo_hue: require('../../assets/foods/bun_bo_hue.jpg'),
  sinh_to_bo: require('../../assets/foods/sinh_to_bo.jpg'),
  pho_bo_tai_chin: require('../../assets/foods/pho_bo_tai_chin.jpg'),
  banh_mi_nong: require('../../assets/foods/banh_mi_nong.jpg'),
  chao_ga: require('../../assets/foods/chao_ga.jpg'),
  mi_quang: require('../../assets/foods/mi_quang.jpg'),
  lau_thai_hai_san: require('../../assets/foods/lau_thai_hai_san.jpg'),
  sup_bi_do: require('../../assets/foods/sup_bi_do.jpg'),
  banh_bao_nhan_thit: require('../../assets/foods/banh_bao_nhan_thit.jpg'),
  tra_gung_mat_ong: require('../../assets/foods/tra_gung_mat_ong.jpg'),
  com_tam_suon_bi_cha: require('../../assets/foods/com_tam_suon_bi_cha.jpg'),
  bun_cha_hn: require('../../assets/foods/bun_cha_hn.jpg'),
  banh_xeo_mien_trung: require('../../assets/foods/banh_xeo_mien_trung.jpg'),
  nuoc_mia: require('../../assets/foods/nuoc_mia.jpg'),
};

export function toFoodItem(food: FoodMetadata): FoodItem {
  return { ...food, image: foodImages[food.imageKey] };
}

export function getFoodSuggestions(
  weather: Pick<MockWeatherItem, 'condition' | 'temperature'>
): FoodSuggestionResult {
  const { condition, temperature } = weather;
  const foodCondition =
    condition === 'rainy' || condition === 'cold' || (condition === 'sunny' && temperature > 28)
      ? condition === 'sunny' ? 'sunny' : condition
      : temperature < 18 ? 'cold' : 'cloudy';
  const reason =
    foodCondition === 'sunny'
      ? `Trời nắng nóng ${temperature}°C — gợi ý món mát, giải nhiệt.`
      : foodCondition === 'rainy'
        ? `Trời mưa ${temperature}°C — gợi ý món nóng, ấm bụng.`
        : foodCondition === 'cold'
          ? `Trời lạnh ${temperature}°C — gợi ý lẩu, nướng và đồ nóng.`
          : `Thời tiết ôn hòa ${temperature}°C — gợi ý món ăn phổ biến.`;

  return {
    condition,
    temperature,
    reason,
    foods: getFoodsForCondition(foodCondition).map(toFoodItem),
  };
}
