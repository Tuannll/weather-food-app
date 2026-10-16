export type FoodCondition = 'sunny' | 'rainy' | 'cold' | 'cloudy';

export interface FoodMetadata {
  name: string;
  imageKey: string;
  description: string;
}

const foodsByCondition: Record<FoodCondition, FoodMetadata[]> = {
  sunny: [
    { name: 'Gỏi cuốn tôm thịt', imageKey: 'goi_cuon_tom_thit', description: 'Cuốn tươi mát với tôm, thịt, bún và rau sống.' },
    { name: 'Chè đá xanh', imageKey: 'che_da_xanh', description: 'Chè đậu xanh mát lạnh, giải nhiệt ngày nắng.' },
    { name: 'Bún bò Huế', imageKey: 'bun_bo_hue', description: 'Bún bò cay nồng, ăn kèm rau sống mát.' },
    { name: 'Sinh tố bơ', imageKey: 'sinh_to_bo', description: 'Sinh tố bơ béo ngậy, bổ dưỡng và mát lạnh.' },
  ],
  rainy: [
    { name: 'Phở bò tái chín', imageKey: 'pho_bo_tai_chin', description: 'Phở nóng hổi với thịt bò tái chín, nước dùng đậm đà.' },
    { name: 'Bánh mì nóng', imageKey: 'banh_mi_nong', description: 'Bánh mì giòn tan, nóng hổi vừa thổi vừa ăn.' },
    { name: 'Cháo gà', imageKey: 'chao_ga', description: 'Cháo gà nóng hổi, bồi bổ cơ thể ngày mưa.' },
    { name: 'Mì Quảng', imageKey: 'mi_quang', description: 'Mì Quảng đậm đà với nước lèo sệt, sợi mì vàng óng.' },
  ],
  cold: [
    { name: 'Lẩu Thái hải sản', imageKey: 'lau_thai_hai_san', description: 'Lẩu chua cay nồng nàn, ấm bụng ngày lạnh.' },
    { name: 'Súp bí đỏ', imageKey: 'sup_bi_do', description: 'Súp kem bí đỏ sánh mịn, giàu dinh dưỡng.' },
    { name: 'Bánh bao nhân thịt', imageKey: 'banh_bao_nhan_thit', description: 'Bánh bao trắng ngần, nhân thịt trứng muối nóng hổi.' },
    { name: 'Trà gừng mật ong', imageKey: 'tra_gung_mat_ong', description: 'Trà gừng ấm nóng, xua tan cái lạnh.' },
  ],
  cloudy: [
    { name: 'Cơm tấm sườn bì chả', imageKey: 'com_tam_suon_bi_cha', description: 'Cơm tấm truyền thống với sườn nướng thơm lừng.' },
    { name: 'Bún chả Hà Nội', imageKey: 'bun_cha_hn', description: 'Bún chả thơm lừng với nước mắm chua ngọt.' },
    { name: 'Bánh xèo miền Trung', imageKey: 'banh_xeo_mien_trung', description: 'Bánh xèo giòn rụm, đúc theo kiểu miền Trung.' },
    { name: 'Nước mía', imageKey: 'nuoc_mia', description: 'Nước mía tươi mát, giải khát nhẹ nhàng.' },
  ],
};

export function getFoodsForCondition(condition: FoodCondition): FoodMetadata[] {
  return foodsByCondition[condition];
}

export function getFoodByName(name: string): FoodMetadata | undefined {
  return Object.values(foodsByCondition).flat().find((food) => food.name === name);
}
