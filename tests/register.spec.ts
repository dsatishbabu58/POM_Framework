import { test, expect } from '@playwright/test';

test('Register new user on Demowebshop', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('textbox', { name: 'First name:' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last name:' }).fill('User');

  const uniqueEmail = `testuser+${Date.now()}@example.com`;
  await page.getByRole('textbox', { name: 'Email:' }).fill(uniqueEmail);

  await page.locator('#Password').fill('Password123!');
  await page.locator('#ConfirmPassword').fill('Password123!');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('.result')).toHaveText('Your registration completed');
});
