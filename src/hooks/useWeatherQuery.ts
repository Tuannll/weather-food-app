import { useQuery } from '@tanstack/react-query';

import axiosClient from '../api/axiosClient';
import { ENV } from '../config/env';
import { cloudyWeather, coldWeather, rainyWeather, sunnyWeather } from '../mock/mockWeatherData';
import { mapOpenWeatherToWeatherItem, type OpenWeatherResponse } from '../utils/weatherMapper';
import { useWeatherStore } from './useWeatherStore';

export type { OpenWeatherResponse } from '../utils/weatherMapper';

export function useWeatherQuery(lat: number | null, lon: number | null) {
  const { isMockMode, activeMockCondition } = useWeatherStore();

  return useQuery({
    queryKey: ['weather', lat, lon, isMockMode, activeMockCondition],
    queryFn: async () => {
      if (isMockMode) {
        return { sunny: sunnyWeather, rainy: rainyWeather, cold: coldWeather, cloudy: cloudyWeather }[activeMockCondition];
      }

      if (!ENV.apiKey) throw new Error('Thiếu OpenWeather API key. Bật Mock Mode hoặc cấu hình .env.');

      const response = await axiosClient.get<OpenWeatherResponse>('/weather', {
        params: { lat, lon, appid: ENV.apiKey, units: 'metric', lang: 'vi' },
      });

      return mapOpenWeatherToWeatherItem(response.data);
    },
    enabled: lat != null && lon != null,
    staleTime: 5 * 60 * 1000,
  });
}
