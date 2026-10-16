export interface WeatherConfig {
  useMockData: boolean;
  apiKey: string | undefined;
}

type WeatherEnvironment = {
  EXPO_PUBLIC_USE_MOCK?: string;
  EXPO_PUBLIC_OPENWEATHER_API_KEY?: string;
};

export function getWeatherConfig(env: WeatherEnvironment): WeatherConfig {
  const apiKey = env.EXPO_PUBLIC_OPENWEATHER_API_KEY?.trim();

  return {
    useMockData: env.EXPO_PUBLIC_USE_MOCK === 'true',
    apiKey: apiKey || undefined,
  };
}

export const ENV = getWeatherConfig({
  EXPO_PUBLIC_USE_MOCK: process.env.EXPO_PUBLIC_USE_MOCK,
  EXPO_PUBLIC_OPENWEATHER_API_KEY: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
});
