import { test, expect } from '@playwright/test';

const loginTestData: string[][] = [
  ["abc.abcd@gmail.com", "12345678", "valid"],
  ["abc.abcde@gmail.com", "test321", "invalid"],
  ["abc@gmail.com", "testxyz", "invalid"],
  ["", "", "invalid"]
];

for (const [email, password, validity] of loginTestData) {
  test.describe('Login data driven test', async () => {
    test(`Login test for ${email} and ${password}`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');

      // Fill login form
      await page.locator('#Email').fill(email);
      await page.locator('#Password').fill(password);
      await page.locator('input[value="Log in"]').click();

      if (validity.toLowerCase() === 'valid') {
        // Assert logout link is visible - indicates successful login
        const logoutLink = page.locator('a[href="/logout"]');
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        // Assert error message is visible and user remains on login page
        const errorMessage = page.locator('.validation-summary-errors');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
      }
    });
  });
}
