import assert from 'node:assert/strict';
import test from 'node:test';

import { getWeatherConfig } from './env.ts';

test('uses mock mode without an OpenWeather API key', () => {
  const config = getWeatherConfig({ EXPO_PUBLIC_USE_MOCK: 'true' });

  assert.deepEqual(config, { useMockData: true, apiKey: undefined });
});

test('trims configured OpenWeather API key', () => {
  const config = getWeatherConfig({
    EXPO_PUBLIC_USE_MOCK: 'false',
    EXPO_PUBLIC_OPENWEATHER_API_KEY: '  valid-key  ',
  });

  assert.deepEqual(config, { useMockData: false, apiKey: 'valid-key' });
});

test('treats blank OpenWeather API key as missing', () => {
  const config = getWeatherConfig({ EXPO_PUBLIC_USE_MOCK: 'false', EXPO_PUBLIC_OPENWEATHER_API_KEY: '   ' });

  assert.deepEqual(config, { useMockData: false, apiKey: undefined });
});
