import { test, expect } from '@playwright/test';

test('Create a new User on GoRest', async ({ request }) => {
  // Generate a unique email to avoid "email has already been taken" errors
  const randomId = Math.floor(Math.random() * 10000);
  const uniqueEmail = `tenali.ramakrishna.${randomId}@15ce.com`;

  const response = await request.post('https://gorest.co.in/public/v2/users', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 19849dc8a14702011337e6a1a7e018eb7d42e4c4b5e5b08312eff2cb11e68f3a'
    },
    data: {
      "name": "Tenali Ramakrishna",
      "gender": "male",
      "email": uniqueEmail,
      "status": "active"
    }
  });

  // 1. Assert Status Code is 201 (Created)
  expect(response.status()).toBe(201);

  // 2. Parse the response
  const responseBody = await response.json();
  console.log('Created User:', responseBody);

  // 3. Assert specific fields in the response
  expect(responseBody.name).toBe('Tenali Ramakrishna');
  expect(responseBody.email).toBe(uniqueEmail);
  expect(responseBody).toHaveProperty('id');
});
