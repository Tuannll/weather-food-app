<div align="center">

# 🍜 Weather Food App

**An Expo / React Native application recommending Vietnamese cuisine based on real-time weather conditions.**

[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI](https://github.com/Tuannll/weather-food-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Tuannll/weather-food-app/actions/workflows/ci.yml)

**English** | [Tiếng Việt](README.vi.md)

**[🚀 Quick Start](#quick-start) • [✨ Features](#features) • [🏗️ Architecture](#architecture) • [🛠️ Tech Stack](#tech-stack) • [🧪 Testing](#testing) • [❓ FAQ](#faq)**

</div>

---

<a id="features"></a>
## ✨ Features

| Domain | Description |
| --- | --- |
| **Weather** | Fetches user location and retrieves temperature, humidity, and wind speed via OpenWeatherMap API. |
| **Food Suggestions** | Automatically recommends dishes matching weather conditions (sunny/hot, rainy, cold, or cloudy). |
| **Mock Mode** | Offline demonstration mode with 4 simulated weather presets—no API key or GPS needed. |
| **Location Fallback** | Gracefully defaults to Hanoi coordinates if location permission is denied or GPS is unavailable. |
| **Dish Details** | Displays dish imagery and descriptions via route parameters preserved across web reloads. |
| **Code Quality** | Strict TypeScript configuration, automated tests for API mapper/catalog/config, isolated typecheck pipeline. |

---

<a id="quick-start"></a>
## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment (.env)

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

### 3. Select Running Mode

Mock Mode (recommended for instant demo, no API key required):

```env
EXPO_PUBLIC_USE_MOCK=true
EXPO_PUBLIC_OPENWEATHER_API_KEY=
```

Live Weather Data (OpenWeatherMap API):

```env
EXPO_PUBLIC_USE_MOCK=false
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
```

> [!TIP]
> Enable `EXPO_PUBLIC_USE_MOCK=true` when running demos. The application works completely offline without network, GPS, or API credentials.

> [!WARNING]
> Variables prefixed with `EXPO_PUBLIC_*` are embedded into client bundles. Only use API keys with configured quota limits for demo purposes; never store sensitive server secrets in this file.

### 4. Start Application

```bash
npm start
```

Run directly on specific platforms:

```bash
npm run android
npm run ios
npm run web
```

---

<a id="architecture"></a>
## 🏗️ Architecture

### Project Structure

```text
weather-food-app/
├── App.tsx                     # NavigationContainer, QueryClientProvider
├── src/
│   ├── api/                    # Axios client for OpenWeatherMap
│   ├── config/                 # Environment validation and reader
│   ├── hooks/                  # React Query weather hook, Zustand store
│   ├── mock/                   # 4 static weather mock scenarios
│   ├── navigation/             # Route type definitions and navigators
│   ├── screens/                # Home, Food Detail, and Settings screens
│   └── utils/                  # Permission handling, API mapper, food catalog
└── assets/foods/               # Food photography assets
```

### Data Flow

1. **Permission Check**: `HomeScreen` requests foreground location permissions via `expo-location`.
2. **Coordinate Resolution**: Obtains device GPS coordinates or triggers Hanoi fallback coordinates.
3. **Weather Query**: `useWeatherQuery` returns mock data or fetches live OpenWeatherMap API responses.
4. **Data Normalization**: `weatherMapper` maps raw API responses into UI-ready view models.
5. **Menu Matching**: `getFoodSuggestions` correlates weather conditions and temperature against catalog items.
6. **Detail Navigation**: `FoodDetail` receives `foodName` parameter and renders catalog metadata.

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack

| Technology | Role |
| --- | --- |
| [Expo](https://expo.dev/) 54 | Mobile runtime framework and build tooling |
| [React Native](https://reactnative.dev/) 0.81 | Cross-platform mobile UI components |
| [TypeScript](https://www.typescriptlang.org/) 5.9 | Static type safety with strict mode |
| [React Navigation](https://reactnavigation.org/) 7 | Routing for Home, Settings, and Food Detail |
| [TanStack Query](https://tanstack.com/query) 5 | Asynchronous state management, caching, and retries |
| [Zustand](https://zustand.docs.pmnd.rs/) 5 | Global state store for Mock Mode and weather data |
| [Axios](https://axios-http.com/) | Promise-based HTTP client for external API requests |
| [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) | Foreground device location and permission management |

---

<a id="testing"></a>
## 🧪 Testing & Quality Assurance

Run TypeScript typecheck:

```bash
npm run typecheck
```

Run test suite:

```bash
npm test
```

GitHub Actions pipeline runs `npm ci`, `npm run typecheck`, and `npm test` on every push and pull request targeting `main`.

### Demo Verification Checklist

- [ ] Enable Mock Mode, cycle through presets: Sunny, Rainy, Cold, Cloudy.
- [ ] Verify weather card and recommended dishes update immediately.
- [ ] Deny location permissions, verify fallback notification to Hanoi coordinates.
- [ ] Disable Mock Mode without API key, verify clean configuration error handling.
- [ ] Supply valid OpenWeatherMap API key, verify temperature, humidity, wind, and description.
- [ ] Navigate to dish detail screen, return to Home, reload web version and confirm routing.

---

<a id="faq"></a>
## ❓ FAQ

<details>
<summary><b>1. Why does the app fail to fetch live weather data?</b></summary>
<br/>

Check that `.env` contains `EXPO_PUBLIC_USE_MOCK=false` and a valid OpenWeatherMap API key. Restart Expo server (`npm start`) after saving `.env`.
</details>

<details>
<summary><b>2. Can the app be used without granting location permission?</b></summary>
<br/>

Yes. The application automatically triggers a fallback mechanism using default Hanoi coordinates to fetch weather and display recommendations.
</details>

<details>
<summary><b>3. Does it run inside Android Studio emulator?</b></summary>
<br/>

Yes. The application requests location as normal; the emulator either returns emulated GPS coordinates or triggers the Hanoi fallback.
</details>

<details>
<summary><b>4. How does Mock Mode differ from live data?</b></summary>
<br/>

Mock Mode uses 4 static weather presets for rapid offline demonstration without API keys. Live data requests current conditions via OpenWeatherMap API.
</details>

---

<a id="contributing"></a>
## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Verify test passes: `npm run typecheck && npm test`.
4. Commit changes and submit a Pull Request.

---

<a id="license"></a>
## 📄 License

Distributed under the [MIT License](LICENSE).
