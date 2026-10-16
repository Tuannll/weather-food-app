import type { MockWeatherItem } from '../mock/mockWeatherData';

export interface OpenWeatherResponse {
  weather?: Array<{
    id: number;
    description?: string;
  }>;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const metadataByCondition: Record<MockWeatherItem['condition'], Pick<MockWeatherItem, 'label' | 'icon'>> = {
  sunny: { label: 'Trời nắng', icon: '☀️' },
  rainy: { label: 'Trời mưa', icon: '🌧️' },
  cold: { label: 'Trời lạnh', icon: '❄️' },
  cloudy: { label: 'Trời nhiều mây', icon: '☁️' },
};

function getCondition(weatherId: number, temperature: number): MockWeatherItem['condition'] {
  if (weatherId >= 200 && weatherId < 600) return 'rainy';
  if ((weatherId >= 600 && weatherId < 700) || temperature < 20) return 'cold';
  if (weatherId >= 700 && weatherId <= 804 && weatherId !== 800) return 'cloudy';
  return 'sunny';
}

function sentenceCase(value?: string): string {
  if (!value) return 'Thời tiết hiện tại.';
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}${value.endsWith('.') ? '' : '.'}`;
}

export function mapOpenWeatherToWeatherItem(data: OpenWeatherResponse): MockWeatherItem {
  const temperature = Math.round(data.main.temp);
  const currentWeather = data.weather?.[0];
  const condition = getCondition(currentWeather?.id ?? 800, temperature);
  const metadata = metadataByCondition[condition];

  return {
    condition,
    label: metadata.label,
    description: sentenceCase(currentWeather?.description),
    temperature,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    icon: metadata.icon,
  };
}
