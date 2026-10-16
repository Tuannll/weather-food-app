import assert from 'node:assert/strict';
import test from 'node:test';

import { mapOpenWeatherToWeatherItem } from './weatherMapper.ts';

test('maps live rain data with API description and icon', () => {
  const weather = mapOpenWeatherToWeatherItem({
    weather: [{ id: 501, description: 'mưa vừa' }],
    main: { temp: 24.4, humidity: 82 },
    wind: { speed: 4.2 },
  });

  assert.deepEqual(weather, {
    condition: 'rainy',
    label: 'Trời mưa',
    description: 'Mưa vừa.',
    temperature: 24,
    humidity: 82,
    windSpeed: 15,
    icon: '🌧️',
  });
});

test('uses cold suggestions below 20°C', () => {
  const weather = mapOpenWeatherToWeatherItem({
    weather: [{ id: 800, description: 'trời quang' }],
    main: { temp: 18.6, humidity: 60 },
    wind: { speed: 1 },
  });

  assert.equal(weather.condition, 'cold');
  assert.equal(weather.icon, '❄️');
});

test('maps cloudy conditions and uses safe fallback metadata', () => {
  const weather = mapOpenWeatherToWeatherItem({
    weather: [{ id: 803, description: 'mây rải rác' }],
    main: { temp: 26, humidity: 70 },
    wind: { speed: 2 },
  });

  assert.equal(weather.condition, 'cloudy');
  assert.equal(weather.description, 'Mây rải rác.');
  assert.equal(weather.icon, '☁️');

  const fallback = mapOpenWeatherToWeatherItem({
    weather: [],
    main: { temp: 30, humidity: 50 },
    wind: { speed: 2 },
  });

  assert.equal(fallback.condition, 'sunny');
  assert.equal(fallback.description, 'Thời tiết hiện tại.');
  assert.equal(fallback.icon, '☀️');
});
