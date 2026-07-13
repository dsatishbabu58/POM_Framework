import { test, expect } from '@playwright/test';

test.describe.serial('Demo Web Shop registration and login', () => {
  let registeredEmail = '';
  const password = 'Password123!';
  const firstName = 'Test';
  const lastName = 'User';

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Register' }).click();

    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByRole('textbox', { name: 'First name:' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last name:' }).fill(lastName);

    registeredEmail = `testuser+${Date.now()}@example.com`;
    await page.getByRole('textbox', { name: 'Email:' }).fill(registeredEmail);

    await page.locator('#Password').fill(password);
    await page.locator('#ConfirmPassword').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.result')).toHaveText('Your registration completed');
    await page.close();
  });

  test('Testcase 2: Log in with the registered user', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.locator('#Email').fill(registeredEmail);
    await page.locator('#Password').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.locator('a[href="/logout"]')).toBeVisible();
  });
});
