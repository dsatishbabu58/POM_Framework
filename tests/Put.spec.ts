import { test, expect } from '@playwright/test';

test('Update Existing user in GoRest Server', async ({ request }) => {
  const userId = '8456046'; // ID provided in your test case
  const token = '19849dc8a14702011337e6a1a7e018eb7d42e4c4b5e5b08312eff2cb11e68f3a';

  // 1. Send PUT request
  const response = await request.put(`https://gorest.co.in{userId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {
      "name": "Allasani Peddana",
      "email": "allasani.peddana@15ce.com",
      "status": "active"
    }
  });

  // 2. Assert Status Code 200 OK
  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe('OK');

  // 3. Parse and validate the response body
  const updatedUser = await response.json();
  console.log('Updated User Details:', updatedUser);

  // 4. Assertions to verify the update took effect
  expect(updatedUser.id.toString()).toBe(userId);
  expect(updatedUser.name).toBe('Allasani Peddana');
  expect(updatedUser.email).toBe('allasani.peddana@15ce.com');
  expect(updatedUser.status).toBe('active');
});
