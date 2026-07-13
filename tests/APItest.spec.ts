
import { test, expect } from '@playwright/test';

test('Create a new User on GoRest', async ({ request }) => {

  const response = await request.get('https://gorest.co.in/public/v2/users', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 19849dc8a14702011337e6a1a7e018eb7d42e4c4b5e5b08312eff2cb11e68f3a'
    }
    
  });

  // 1. Assert Status Code is 201 (Created)
expect([200, 201,202]).toContain(response.status());
  expect(response.statusText()).toBe('OK');
 console.log(response.statusText());
  console.log(response.status());

  // 2. Parse the response
  const users = await response.json();

  // 3. Assert response is an array and log users
  expect(Array.isArray(users)).toBeTruthy();
  console.log('Total users Fetched:',users.length);
  console.log(users);
});