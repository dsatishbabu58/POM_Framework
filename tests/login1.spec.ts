import { test, expect, Locator } from '@playwright/test';
import * as XLSX from 'xlsx';

// Excel file path
const ExcelPath = './data/UserData.xlsx';

// // 🔧 Helper function for validation errors
// async function expectValidationErrors(
//   locator: Locator,
//   expectedMessages: string[],
//   minCount: number = 1
// ) {
//   const errors = await locator.allTextContents();
//   const normalizedErrors = errors.map(e => e.trim());

//   const matches = expectedMessages.filter(msg =>
//     normalizedErrors.includes(msg)
//   );

//   console.log('Errors found:', normalizedErrors);
//   console.log('Matched messages:', matches);

//   expect(matches.length).toBeGreaterThanOrEqual(minCount);
// }

test.describe('Data-driven registration and login tests', () => {
  // Read Excel file
  const workbook = XLSX.readFile(ExcelPath);
  const worksheet = workbook.Sheets['Sheet1'];

  // Convert sheet to JSON
  const loginTestData = XLSX.utils.sheet_to_json(worksheet);

  for (const row of loginTestData) {
    const Fname = row['Fname'] || '';
    const Lname = row['Lname'] || '';
    const email = row['email'] || '';
    const email1 = row['email1'] || '';
    const password = row['Password'] || '';
    const ConfirmPassword = row['ConfirmPassword'] || '';
    const validity = (row['validity'] || '').toString().toLowerCase();

    // Registration test
    test(`Register new user: ${email || 'blank email'}`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/register');
      await page.locator('#gender-male').check();
      await page.locator('#FirstName').fill(Fname);
      await page.locator('#LastName').fill(Lname);

      // Ensure unique email for valid registration
      const uniqueEmail =
        validity === 'valid' ? `${Date.now()}_${email}` : email;
      await page.locator('#Email').fill(uniqueEmail);

      await page.locator('#Password').fill(password);
      await page.locator('#ConfirmPassword').fill(ConfirmPassword);
      await page.locator('input[value="Register"]').click();

      if (validity === 'valid') {
        // ✅ Case 1: Successful registration
        await expect(page.locator('.result')).toHaveText(
          'Your registration completed'
        );
      } else if (await page.locator('.validation-summary-errors').isVisible()) {
        // ✅ Case 2: Duplicate email error
        await expect(page.locator('.validation-summary-errors')).toContainText(
          'The specified email already exists'
        );
      } else {
        // ✅ Case 3: Fallback - still on register page
        await expect(page).toHaveURL(
          'https://demowebshop.tricentis.com/register'
        );
      }

      // Field-level validation
      await expectValidationErrors(
        page.locator('.field-validation-error'),
        [
          'First name is required.',
          'Last name is required.',
          'Email is required.',
          'Password is required.',
          'Confirm password is required.',
        ],
        1
      );
    });

    // Login test
    test(`Login test for ${email1 || 'blank email1'}`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/login');
      await page.locator('#Email').fill(email1);
      await page.locator('#Password').fill(password);
      await page.locator('input[value="Log in"]').click();

      if (validity === 'valid') {
        await expect(page.locator('a[href="/logout"]')).toBeVisible({
          timeout: 5000,
        });
      } else {
        await expect(page.locator('.validation-summary-errors')).toBeVisible({
          timeout: 5000,
        });
        await expect(page).toHaveURL(
          'https://demowebshop.tricentis.com/login'
        );
      }
    });
  }
});
