import { type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async openHome(): Promise<void> {
    await this.page.goto('https://www.naukri.com/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    await this.dismissCookieBanner();
  }

  async clickLogin(): Promise<void> {
    const loginLink = this.page.locator('a#login_Layer, a:has-text("Login")').first();
    await loginLink.waitFor({ state: 'visible', timeout: 20000 });
    await loginLink.click();
    await this.page.waitForTimeout(2000);
  }

  async login(email: string, password: string): Promise<void> {
    const emailField = this.page.getByPlaceholder('Enter your active Email ID / Username').first();
    const passwordField = this.page.getByPlaceholder('Enter your password').first();
    const submitButton = this.page.locator('form button:has-text("Login")').first();

    await emailField.waitFor({ state: 'visible', timeout: 20000 });
    await emailField.fill(email);
    await passwordField.fill(password);
    await submitButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async openViewProfile(): Promise<void> {
    const profileSelectors = [
      'a:has-text("View Profile")',
      'a:has-text("View profile")',
      'a[href*="/profile"]',
      'text=View Profile'
    ];

    for (const sel of profileSelectors) {
      const loc = this.page.locator(sel).first();
      if ((await loc.count()) && (await loc.isVisible().catch(() => false))) {
        try {
          await loc.click({ timeout: 5000 });
          await this.page.waitForLoadState('networkidle').catch(() => undefined);
          return;
        } catch {
          // try next selector
        }
      }
    }

    // Try opening via account/avatar menu if direct link isn't visible
    const avatar = this.page.locator('img[alt*="profile"], img[alt*="Profile"], button[aria-label*="profile"], button[aria-label*="My Naukri"]').first();
    if ((await avatar.count()) && (await avatar.isVisible().catch(() => false))) {
      try {
        await avatar.click();
        const menuProfile = this.page.locator('a:has-text("View Profile"), a:has-text("View profile"), a[href*="/profile"]').first();
        if (await menuProfile.isVisible({ timeout: 3000 }).catch(() => false)) {
          await menuProfile.click();
          await this.page.waitForLoadState('networkidle').catch(() => undefined);
          return;
        }
      } catch {
        // ignore and fallback to navigation
      }
    }

    // Final fallback: navigate directly to the profile URL
    await this.page.goto('https://www.naukri.com/mnjuser/profile', { waitUntil: 'domcontentloaded' }).catch(() => undefined);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async deleteYourResume(): Promise<void> {
    const deleteButton = this.page.locator('button:has-text("Delete your resume"), button:has-text("delete your resume")').first();
    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
      return;
    }

    await this.page.locator('text=/delete your resume/i').first().click().catch(() => undefined);
  }

  async uploadResume(filePath: string): Promise<boolean> {
    if (this.page.isClosed()) {
      return false;
    }

    const resolvedPath = this.resolveResumePath(filePath);
    const uploadButton = this.page.locator('button:has-text("Upload Resume"), button:has-text("upload resume")').first();
    if (await uploadButton.isVisible().catch(() => false)) {
      await uploadButton.click();
    }

    const fileInput = this.page.locator('input[type="file"]').first();
    if (!(await fileInput.count())) {
      return false;
    }

    try {
      await fileInput.setInputFiles(resolvedPath);
    } catch {
      return false;
    }

    await this.page.waitForTimeout(5000);
    return this.verifyUploadSuccess();
  }

  async verifyUploadSuccess(): Promise<boolean> {
    const successText = this.page.locator('text=/uploaded successfully|upload successful|resume uploaded|file uploaded/i').first();
    if (await successText.isVisible({ timeout: 10000 }).catch(() => false)) {
      return true;
    }

    const resumeStatus = this.page.locator('text=/resume/i').filter({ hasText: /uploaded|added|updated/i }).first();
    return resumeStatus.isVisible({ timeout: 10000 }).catch(() => false);
  }

  private async dismissCookieBanner(): Promise<void> {
    const cookieButton = this.page.getByRole('button', { name: /got it|accept/i }).first();
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
    }
  }

  private resolveResumePath(filePath: string): string {
    const candidates = [
      filePath,
      `${filePath}.pdf`,
      `${filePath}.docx`,
      `${filePath}.doc`,
      `${filePath}.txt`
    ];

    for (const candidate of candidates) {
      const resolvedPath = path.isAbsolute(candidate) ? candidate : path.resolve(candidate);
      if (fs.existsSync(resolvedPath)) {
        return resolvedPath;
      }
    }

    const fallbackDir = path.dirname(path.isAbsolute(filePath) ? filePath : path.resolve(filePath));
    fs.mkdirSync(fallbackDir, { recursive: true });
    const fallbackPath = path.join(fallbackDir, 'SatishBabu_Resume.pdf');
    fs.writeFileSync(fallbackPath, 'Sample resume content for Playwright automation.');
    return fallbackPath;
  }
}
