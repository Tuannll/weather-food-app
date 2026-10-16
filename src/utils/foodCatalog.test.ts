import assert from 'node:assert/strict';
import test from 'node:test';

import { getFoodByName, getFoodsForCondition } from './foodCatalog.ts';

test('finds food detail by route name', () => {
  assert.equal(getFoodByName('Phở bò tái chín')?.description, 'Phở nóng hổi với thịt bò tái chín, nước dùng đậm đà.');
});

test('returns undefined for unknown food route name', () => {
  assert.equal(getFoodByName('Món không tồn tại'), undefined);
});

test('returns hot food suggestions for rainy weather', () => {
  const foods = getFoodsForCondition('rainy');

  assert.equal(foods[0].name, 'Phở bò tái chín');
});
