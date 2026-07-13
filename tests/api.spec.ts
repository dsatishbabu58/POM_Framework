import { test, expect } from '@playwright/test';
import { api } from '../data/api-data';
import { getUsers } from '../utils/api-utils';
import { ApiPage } from '../pages/api.page';

test.describe('GoRest /users', () => {
  test('GET users returns array and basic fields', async ({ request }) => {
    const resp = await getUsers(request, api.baseURL);
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(Array.isArray(body)).toBe(true);
    if (body.length > 0) {
      const u = body[0];
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('name');
      expect(u).toHaveProperty('email');
    }
  });

  test('GET users via ApiPage wrapper', async ({ request }) => {
    const apiPage = new ApiPage(request, api.baseURL);
    const resp = await apiPage.getUsers();
    expect(resp.status()).toBe(200);
  });
});
