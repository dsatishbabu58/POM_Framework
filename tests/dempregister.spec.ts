import { test, expect } from '@playwright/test';

test('dempregister - register a new user', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/register');

  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('textbox', { name: 'First name:' }).fill('babu');
  await page.getByRole('textbox', { name: 'Last name:' }).fill('satish');

  const now = new Date();
  const stamp = [
    now.getDate().toString().padStart(2, '0'),
    (now.getMonth() + 1).toString().padStart(2, '0'),
    now.getFullYear(),
    now.getHours().toString().padStart(2, '0'),
    now.getMinutes().toString().padStart(2, '0'),
    now.getSeconds().toString().padStart(2, '0')
  ].join('');

  const email = `satish.${stamp}@gmail.com`;
  await page.getByRole('textbox', { name: 'Email:' }).fill(email);
  await page.locator('#Password').fill('12345678');
  await page.locator('#ConfirmPassword').fill('12345678');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('.result')).toContainText('Your registration completed');
});
