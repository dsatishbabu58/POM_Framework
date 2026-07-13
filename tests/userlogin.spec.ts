import { test, expect } from '@playwright/test';

const baseUrl = 'https://demowebshop.tricentis.com';
const validEmail = 'abc.abcd@gmail.com';
const validPassword = '12345678';
const invalidEmail = 'abc.abcde@gmail.com';
const invalidPassword = 'wrong-password';

test.describe('User login page', () => {
  test('checks the user ID label text', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await expect(page.locator('label[for="Email"]')).toContainText('Email');
  });

  test('checks the password label text', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await expect(page.locator('label[for="Password"]')).toContainText('Password');
  });

  test('checks the login button label text', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await expect(page.locator('input[value="Log in"]')).toHaveValue('Log in');
  });

  test('logs in successfully with valid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.locator('#Email').fill(validEmail);
    await page.locator('#Password').fill(validPassword);
    await page.locator('input[value="Log in"]').click();

    await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 10000 });
  });

  test('shows an error message for invalid credentials', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.locator('#Email').fill(invalidEmail);
    await page.locator('#Password').fill(invalidPassword);
    await page.locator('input[value="Log in"]').click();

    const errorMessage = page.locator('.validation-summary-errors');
    await expect(errorMessage).toContainText('Login was unsuccessful');
    await expect(page).toHaveURL(`${baseUrl}/login`);
  });
});
