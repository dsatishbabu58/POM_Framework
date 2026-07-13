import { type Page } from '@playwright/test';

export type UserCredentials = {
  username: string;
  password: string;
};

export class LoginPage {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl = 'https://demowebshop.tricentis.com/') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async open(): Promise<void> {
    await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async openLoginPage(): Promise<void> {
    await this.open();
    await this.page.getByRole('link', { name: /log in/i }).click();
    await this.page.waitForURL(/.*\/login/);
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.page.locator('#Email').fill(username);
    await this.page.locator('#Password').fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.getByRole('button', { name: /log in/i }).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.openLoginPage();
    await this.fillCredentials(username, password);
    await this.clickLogin();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page
      .locator('a[href="/logout"]')
      .isVisible({ timeout: 5000 })
      .catch(() => false);
  }

  async getLoginErrorText(): Promise<string> {
    return await this.page.locator('.validation-summary-errors').innerText().catch(() => '');
  }
}
