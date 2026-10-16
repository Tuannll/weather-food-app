<div align="center">

# Weather Food App

**Ứng dụng Expo/React Native gợi ý món ăn Việt Nam theo thời tiết hiện tại.**

[![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?style=flat-square&logo=reactquery&logoColor=white)](https://tanstack.com/query)

[Quick Start](#quick-start) · [Tính năng](#tính-năng) · [Kiến trúc](#kiến-trúc) · [Kiểm tra](#kiểm-tra)

</div>

---

## Tính năng

| Nhóm | Nội dung |
| --- | --- |
| **Thời tiết** | Lấy vị trí hiện tại, tải nhiệt độ, độ ẩm, tốc độ gió từ OpenWeatherMap. |
| **Gợi ý món ăn** | Chọn danh sách món ăn phù hợp nắng nóng, mưa, lạnh hoặc nhiều mây. |
| **Mock Mode** | Demo offline với bốn kịch bản thời tiết, không cần API key. |
| **Fallback vị trí** | Dùng Hà Nội khi người dùng từ chối quyền vị trí hoặc GPS không phản hồi. |
| **Chi tiết món ăn** | Xem ảnh và mô tả món ăn qua route parameter ổn định sau khi reload web. |
| **Chất lượng mã** | TypeScript strict, test config/API mapper/catalog, typecheck riêng. |

---

## Quick Start

### 1. Cài dependencies

```bash
npm install
```

### 2. Tạo file môi trường

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

### 3. Chọn chế độ chạy

Mock Mode, chạy được ngay:

```env
EXPO_PUBLIC_USE_MOCK=true
EXPO_PUBLIC_OPENWEATHER_API_KEY=
```

Dữ liệu thật từ OpenWeatherMap:

```env
EXPO_PUBLIC_USE_MOCK=false
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
```

> [!TIP]
> Dùng `EXPO_PUBLIC_USE_MOCK=true` khi demo. Không cần mạng, GPS hay API key.

> [!WARNING]
> Biến `EXPO_PUBLIC_*` nằm trong bundle ứng dụng. Chỉ dùng OpenWeatherMap key giới hạn quota/domain cho demo. Không lưu secret trong `.env` này.

### 4. Khởi động ứng dụng

```bash
npm start
```

Chạy trực tiếp theo nền tảng:

```bash
npm run android
npm run ios
npm run web
```

---

## Kiến trúc

```text
Weather Food App
├── App.tsx                     # NavigationContainer, QueryClientProvider
├── src/
│   ├── api/                    # Axios client OpenWeatherMap
│   ├── config/                 # Đọc và kiểm tra environment variables
│   ├── hooks/                  # React Query weather query, Zustand state
│   ├── mock/                   # Bốn kịch bản thời tiết demo
│   ├── navigation/             # Route types
│   ├── screens/                # Home, Food Detail, Settings
│   └── utils/                  # Permission, mapper API, food catalog
└── assets/foods/               # Ảnh món ăn
```

### Luồng dữ liệu

1. `HomeScreen` xin quyền vị trí qua `expo-location`.
2. App dùng GPS hoặc fallback Hà Nội.
3. `useWeatherQuery` trả mock data hoặc gọi OpenWeatherMap.
4. `weatherMapper` chuẩn hóa API response thành dữ liệu hiển thị.
5. `getFoodSuggestions` chọn danh sách món ăn theo condition và nhiệt độ.
6. `FoodDetail` nhận `foodName` từ route và tra lại catalog.

---

## Công nghệ

| Công nghệ | Vai trò |
| --- | --- |
| [Expo](https://expo.dev/) 54 | Runtime và công cụ phát triển mobile. |
| [React Native](https://reactnative.dev/) 0.81 | UI đa nền tảng. |
| [TypeScript](https://www.typescriptlang.org/) 5.9 | Type safety với strict mode. |
| [React Navigation](https://reactnavigation.org/) 7 | Điều hướng Home, Settings, Food Detail. |
| [TanStack Query](https://tanstack.com/query) 5 | Fetch, cache, retry state thời tiết. |
| [Zustand](https://zustand.docs.pmnd.rs/) 5 | Mock Mode và weather state dùng chung. |
| [Axios](https://axios-http.com/) | HTTP client cho OpenWeatherMap. |
| [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) | Quyền và vị trí foreground. |

---

## Kiểm tra

Chạy typecheck:

```bash
npm run typecheck
```

Chạy test:

```bash
npm test
```

Test hiện có kiểm tra:

- Parse Mock Mode và OpenWeather API key.
- Map response OpenWeatherMap: mưa, lạnh, nhiều mây, fallback.
- Tra món ăn hợp lệ và route món ăn không tồn tại.

### Checklist demo

- [ ] Bật Mock Mode, chọn lần lượt nắng, mưa, lạnh, nhiều mây.
- [ ] Xác nhận weather card và danh sách món ăn đổi ngay.
- [ ] Từ chối quyền vị trí, xác nhận thông báo fallback Hà Nội.
- [ ] Tắt Mock Mode khi thiếu key, xác nhận lỗi cấu hình rõ ràng.
- [ ] Dùng API key hợp lệ, xác nhận nhiệt độ, độ ẩm, gió, mô tả thời tiết.
- [ ] Mở chi tiết món ăn, quay lại Home, reload web và thử route hợp lệ.

---

## Câu hỏi thường gặp

### App không tải thời tiết thật?

Kiểm tra `.env` có `EXPO_PUBLIC_USE_MOCK=false` và key hợp lệ. Khởi động lại Expo sau khi sửa `.env`.

### Không cấp quyền vị trí có dùng được không?

Có. App dùng tọa độ Hà Nội để tiếp tục tải hoặc demo thời tiết.

### Android Emulator có chạy được không?

Có. App vẫn xin quyền vị trí; emulator có thể trả vị trí mock hoặc app dùng fallback Hà Nội.

### Mock Mode khác dữ liệu thật thế nào?

Mock Mode dùng bốn mẫu thời tiết cố định. Dữ liệu thật lấy từ OpenWeatherMap theo tọa độ hiện tại.

---

## Đóng góp

1. Fork repository.
2. Tạo branch: `git checkout -b feature/ten-tinh-nang`.
3. Chạy `npm run typecheck` và `npm test`.
4. Commit thay đổi và tạo Pull Request.

---

## License

Distributed under [MIT License](LICENSE).
