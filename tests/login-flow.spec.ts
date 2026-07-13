import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { validUser, invalidUser } from '../fixtures/userFixtures';
import { getDemoWebsiteUrl } from '../utils/login-utils';

test.describe('Demo Web Shop login flow', () => {
  test('should login with valid user id and password', async ({ page }) => {
    const loginPage = new LoginPage(page, getDemoWebsiteUrl());

    await loginPage.login(validUser.username, validUser.password);

    await expect(page.locator('a[href="/logout"]')).toBeVisible();
    await expect(loginPage.isLoggedIn()).resolves.toBe(true);
  });

  test('should show an error when credentials are invalid', async ({ page }) => {
    const loginPage = new LoginPage(page, getDemoWebsiteUrl());

    await loginPage.openLoginPage();
    await loginPage.fillCredentials(invalidUser.username, invalidUser.password);
    await loginPage.clickLogin();

    await expect(page.locator('.validation-summary-errors')).toContainText(
      'Login was unsuccessful'
    );
    await expect(loginPage.isLoggedIn()).resolves.toBe(false);
  });
});
