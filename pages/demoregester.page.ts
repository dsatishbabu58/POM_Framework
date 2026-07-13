import { type Page } from '@playwright/test';

export class DemoRegisterPage {
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

  async getSuccessMessage(): Promise<string> {
    await this.page.locator('.result').waitFor({ state: 'visible', timeout: 15000 });
    return this.page.locator('.result').innerText();
  }
}
