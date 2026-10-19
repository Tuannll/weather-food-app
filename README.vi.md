<div align="center">

# 🍜 Weather Food App

**Ứng dụng Expo / React Native gợi ý món ăn Việt Nam theo thời tiết hiện tại.**

[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/Tuannll/weather-food-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Tuannll/weather-food-app/actions/workflows/ci.yml)

[English](README.md) | **Tiếng Việt**

**[🚀 Quick Start](#quick-start) • [✨ Tính năng](#features) • [🏗️ Kiến trúc](#architecture) • [🛠️ Công nghệ](#tech-stack) • [🧪 Kiểm thử](#testing) • [❓ FAQ](#faq)**

</div>

---

<a id="features"></a>
## ✨ Tính năng

| Nhóm | Nội dung |
| --- | --- |
| **Thời tiết** | Lấy vị trí hiện tại, tải nhiệt độ, độ ẩm, tốc độ gió từ OpenWeatherMap API. |
| **Gợi ý món ăn** | Tự động đề xuất danh sách món ăn Việt Nam phù hợp thời tiết nắng, mưa, lạnh hoặc nhiều mây. |
| **Mock Mode** | Chế độ demo offline với 4 kịch bản thời tiết giả lập, không cần API key hay GPS. |
| **Fallback vị trí** | Tự động dùng tọa độ Hà Nội khi người dùng từ chối quyền vị trí hoặc GPS không phản hồi. |
| **Chi tiết món ăn** | Xem hình ảnh và mô tả món ăn qua route parameter ổn định sau khi reload web. |
| **Chất lượng mã** | TypeScript strict mode, kiểm thử tự động API mapper/catalog/config, phân tách typecheck riêng. |

---

<a id="quick-start"></a>
## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Thiết lập môi trường (.env)

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

### 3. Chọn chế độ chạy

Mock Mode (chạy demo ngay, không cần API key):

```env
EXPO_PUBLIC_USE_MOCK=true
EXPO_PUBLIC_OPENWEATHER_API_KEY=
```

Dữ liệu thời tiết thật (OpenWeatherMap):

```env
EXPO_PUBLIC_USE_MOCK=false
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
```

> [!TIP]
> Bật `EXPO_PUBLIC_USE_MOCK=true` khi chạy demo. Ứng dụng hoạt động đầy đủ không cần mạng, GPS hay API key.

> [!WARNING]
> Biến `EXPO_PUBLIC_*` được nhúng trực tiếp vào bundle client. Chỉ dùng API key có giới hạn quota cho demo, tuyệt đối không lưu secret nhạy cảm vào file `.env` này.

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

<a id="architecture"></a>
## 🏗️ Kiến trúc Hệ thống

### Cấu trúc thư mục

```text
weather-food-app/
├── App.tsx                     # NavigationContainer, QueryClientProvider
├── src/
│   ├── api/                    # Axios client gọi OpenWeatherMap
│   ├── config/                 # Đọc và xác thực biến môi trường
│   ├── hooks/                  # React Query weather hook, Zustand store
│   ├── mock/                   # 4 kịch bản thời tiết giả lập demo
│   ├── navigation/             # Định nghĩa route types & navigator
│   ├── screens/                # Màn hình Home, Food Detail, Settings
│   └── utils/                  # Xử lý quyền vị trí, mapper API, food catalog
└── assets/foods/               # Thư viện hình ảnh món ăn
```

### Luồng dữ liệu (Data Flow)

1. **Yêu cầu quyền**: `HomeScreen` xin cấp quyền truy cập vị trí qua `expo-location`.
2. **Xác định tọa độ**: Ứng dụng nhận tọa độ GPS thực tế hoặc tự động kích hoạt fallback Hà Nội.
3. **Truy vấn thời tiết**: `useWeatherQuery` trả về mock data hoặc gọi API OpenWeatherMap.
4. **Chuẩn hóa dữ liệu**: `weatherMapper` chuyển đổi API response thô thành cấu trúc dữ liệu hiển thị.
5. **Đề xuất món ăn**: `getFoodSuggestions` đối chiếu điều kiện thời tiết và nhiệt độ để chọn thực đơn tối ưu.
6. **Điều hướng chi tiết**: `FoodDetail` nhận `foodName` từ route param và tra cứu thông tin trong catalog.

---

<a id="tech-stack"></a>
## 🛠️ Công nghệ Sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| [Expo](https://expo.dev/) 54 | Runtime và bộ công cụ phát triển mobile. |
| [React Native](https://reactnative.dev/) 0.81 | Xây dựng giao diện đa nền tảng. |
| [TypeScript](https://www.typescriptlang.org/) 5.9 | Type safety với cấu hình strict mode. |
| [React Navigation](https://reactnavigation.org/) 7 | Điều hướng màn hình Home, Settings, Food Detail. |
| [TanStack Query](https://tanstack.com/query) 5 | Quản lý fetch, cache, retry state thời tiết. |
| [Zustand](https://zustand.docs.pmnd.rs/) 5 | Quản lý state toàn cục cho Mock Mode và dữ liệu thời tiết. |
| [Axios](https://axios-http.com/) | HTTP client gửi request tới OpenWeatherMap. |
| [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) | Quản lý quyền và lấy vị trí foreground. |

---

<a id="testing"></a>
## 🧪 Kiểm thử & Chất lượng

Kiểm tra lỗi kiểu dữ liệu:

```bash
npm run typecheck
```

Chạy toàn bộ unit test:

```bash
npm test
```

Pipeline GitHub Actions tự động thực thi `npm ci`, `npm run typecheck`, `npm test` trên mọi lượt push và Pull Request vào nhánh `main`.

### Checklist chạy thử

- [ ] Bật Mock Mode, chuyển đổi giữa các trạng thái: nắng, mưa, lạnh, nhiều mây.
- [ ] Xác nhận thẻ thời tiết và danh sách món ăn gợi ý cập nhật tức thì.
- [ ] Từ chối quyền vị trí, kiểm tra hiển thị thông báo dùng fallback Hà Nội.
- [ ] Tắt Mock Mode khi chưa nhập key, xác nhận thông báo lỗi cấu hình hiển thị rõ ràng.
- [ ] Nhập API key hợp lệ, xác nhận tải đúng nhiệt độ, độ ẩm, tốc độ gió và mô tả.
- [ ] Mở chi tiết món ăn, quay lại Home, reload trên web và xác nhận route hoạt động bình thường.

---

<a id="faq"></a>
## ❓ Câu hỏi Thường gặp (FAQ)

<details>
<summary><b>1. App không tải được dữ liệu thời tiết thật?</b></summary>
<br/>

Kiểm tra file `.env` đã đặt `EXPO_PUBLIC_USE_MOCK=false` và điền API key OpenWeatherMap hợp lệ chưa. Cần khởi động lại Expo server (`npm start`) sau khi sửa file `.env`.
</details>

<details>
<summary><b>2. Không cấp quyền vị trí GPS có dùng được app không?</b></summary>
<br/>

Có. Ứng dụng tự động kích hoạt cơ chế fallback sử dụng tọa độ mặc định của Hà Nội để tải thời tiết và đề xuất món ăn bình thường.
</details>

<details>
<summary><b>3. Ứng dụng có chạy được trên Android Emulator không?</b></summary>
<br/>

Được. Ứng dụng vẫn gửi yêu cầu cấp quyền; emulator có thể trả về vị trí giả lập hoặc ứng dụng tự động dùng tọa độ fallback Hà Nội.
</details>

<details>
<summary><b>4. Mock Mode khác gì so với dữ liệu thời tiết thật?</b></summary>
<br/>

Mock Mode dùng 4 mẫu thời tiết cố định phục vụ demo nhanh, không cần mạng hay key. Dữ liệu thật lấy trực tiếp từ OpenWeatherMap API theo tọa độ GPS thời gian thực.
</details>

---

<a id="contributing"></a>
## 🤝 Đóng góp

1. Fork repository.
2. Tạo branch tính năng: `git checkout -b feature/ten-tinh-nang`.
3. Chạy kiểm tra: `npm run typecheck && npm test`.
4. Commit thay đổi và mở Pull Request.

---

<a id="license"></a>
## 📄 Giấy phép

Dự án được phân phối dưới giấy phép [MIT License](LICENSE).
