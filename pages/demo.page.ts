import { type Page } from '@playwright/test';

export class DemoPage {
  constructor(private readonly page: Page) {}

  async openRegistrationPage(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  async selectGender(gender: string): Promise<void> {
    await this.page.getByRole('radio', { name: gender, exact: true }).check();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.getByLabel('First name:').fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.getByLabel('Last name:').fill(lastName);
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.getByLabel('Email:').fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.locator('#Password').fill(password);
  }

  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.page.locator('#ConfirmPassword').fill(confirmPassword);
  }

  async submitRegistration(): Promise<void> {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async logout(): Promise<void> {
    const logoutLink = this.page.getByRole('link', { name: 'Log out' });
    if (await logoutLink.count()) {
      await logoutLink.first().click();
    }
  }

  async openLoginPage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await this.page.waitForURL(/\/login$/);
  }

  async fillLoginEmail(email: string): Promise<void> {
    await this.page.locator('#Email').fill(email);
  }

  async fillLoginPassword(password: string): Promise<void> {
    await this.page.locator('#Password').fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator('a[href="/logout"]').isVisible();
  }

  async getLogoutLinkText(): Promise<string> {
    return this.page.locator('a[href="/logout"]').innerText();
  }

  async getSuccessMessage(): Promise<string> {
    await this.page.locator('.result').waitFor({ state: 'visible', timeout: 15000 });
    return this.page.locator('.result').innerText();
  }
}

