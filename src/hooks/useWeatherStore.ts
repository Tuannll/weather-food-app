import { create } from 'zustand';

import { ENV } from '../config/env';
import type { MockWeatherItem } from '../mock/mockWeatherData';

export type WeatherCondition = 'sunny' | 'rainy' | 'cold' | 'cloudy';

interface WeatherState {
  weather: MockWeatherItem | null;
  isMockMode: boolean;
  activeMockCondition: WeatherCondition;
  setWeather: (weather: MockWeatherItem | null) => void;
  setIsMockMode: (isMock: boolean) => void;
  setActiveMockCondition: (condition: WeatherCondition) => void;
}

export const useWeatherStore = create<WeatherState>()((set) => ({
  weather: null,
  isMockMode: ENV.useMockData,
  activeMockCondition: 'sunny',
  setWeather: (weather) => set({ weather }),
  setIsMockMode: (isMockMode) => set({ isMockMode }),
  setActiveMockCondition: (activeMockCondition) => set({ activeMockCondition }),
}));
