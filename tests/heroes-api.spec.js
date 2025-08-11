// @ts-check
import { test, expect } from '@playwright/test';

test('getting heroes', async ({ request }) => {
  const response = await request.get('/heroes');
  expect(response.ok()).toBeTruthy();
  const resData = await response.json();
  expect(resData).toHaveProperty('heroes');
  expect(Array.isArray(resData.heroes)).toBeTruthy();
  expect(resData.heroes.length).toBeGreaterThan(0);
});
