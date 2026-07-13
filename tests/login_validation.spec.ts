import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import * as path from 'path';

// Increase timeout for network variability
test.setTimeout(60000);

function readData() {
  const workbookPath = path.resolve(__dirname, '..', 'data', 'login-validation.xlsx');
  const workbook = XLSX.readFile(workbookPath);
  const worksheet = workbook.Sheets['Sheet1'];
  const rows = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });
  const [headers, values] = rows as string[][];
  const map = {} as Record<string, string>;
  headers.forEach((h, i) => (map[h] = values?.[i] || ''));
  return {
    firstName: map['First name'] || 'babu',
    lastName: map['Last name'] || 'satish',
    email: map['Email'] || '',
    password: map['Password'] || '12345678',
    confirmPassword: map['Confirm password'] || '12345678',
  };
}

test('login_validation', async ({ page }) => {
  const user = readData();

  // Testcase 1: Register
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('textbox', { name: 'First name:' }).fill(user.firstName);
  await page.getByRole('textbox', { name: 'Last name:' }).fill(user.lastName);
  await page.getByRole('textbox', { name: 'Email:' }).fill(user.email);
  await page.locator('#Password').fill(user.password);
  await page.locator('#ConfirmPassword').fill(user.confirmPassword);
  await page.getByRole('button', { name: 'Register' }).click();

  // Verify registration: either success message or being redirected to account page
  const registered = await page.locator('.result').first().isVisible().catch(() => false);
  if (registered) {
    await expect(page.locator('.result')).toHaveText('Your registration completed');
  } else {
    // fallback: expect we are on customer info or have logout link
    const hasAccountLink = await page.locator('a[href="/customer/info"]').first().isVisible().catch(() => false);
    if (!hasAccountLink) {
      throw new Error('Registration did not complete and customer info not present');
    }
  }

  // Click Log out link
  const logoutLink = page.getByRole('link', { name: 'Log out' });
  if (await logoutLink.count()) await logoutLink.click();

  // Testcase 2: Login
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#Email').fill(user.email);
  await page.locator('#Password').fill(user.password);
  await page.getByRole('button', { name: 'Log in' }).click();

  // Verify successfully logged in via logout link
  await expect(page.locator('a[href="/logout"]')).toBeVisible();
});
