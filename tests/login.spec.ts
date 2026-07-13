import { test, expect } from '@playwright/test';

// test('login flow - successful login', async ({ page }) => {
//   // Navigate to your login page
//   await page.goto('https://demowebshop.tricentis.com/');


//   await page.locator('a[href="/login"]').click();
//   // Fill in the login form
//   await page.fill('#Email', 'babu.75@gmail.com');   // replace #username with the actual selector
//   await page.fill('#Password', '123456'); // replace #password with the actual selector

//   // Click the login button
// //   await page.click('#loginButton'); // replace #loginButton with the actual selector
//   await page.locator('input[value="Log in"]').click();
//   // Verify successful login (example: check for a dashboard title or URL)
// //   await expect(page).toHaveURL(/dashboard/);
// //   await expect(page.locator('a[href="/customer/info"]')).toContainText('babu.75@gmail.com');
//   await expect(
//   page.locator('a[href="/customer/info"]', { hasText: 'babu.75@gmail.com' })
// ).toContainText('babu.75@gmail.com');
// })


// test('login flow - unsuccessful login', async ({ page }) => {
//   // Step 1: Navigate to site
//   await page.goto('https://demowebshop.tricentis.com/');

//   // Step 2: Go to login page
//   await page.locator('a[href="/login"]').click();
// //   await expect(page).toHaveURL(/.*\/login/);

//   // Step 3: Fill credentials
//   await page.locator('#Email').fill('babu.75@gmail.com');
//   await page.locator('#Password').fill('1234567');

//   // Step 4: Submit login
//   await page.locator('input[value="Log in"]').click();

//   // Step 5: Verify error message
//   await expect(page.locator('.validation-summary-errors'))
//     .toContainText('Login was unsuccessful. Please correct the errors and try again.');
//   await expect(page.locator('.validation-summary-errors'))
//     .toContainText('The credentials provided are incorrect');


// })

test('login flow - unsuccessful login1', async ({ page }) => {
  // Step 1: Navigate to site
  await page.goto('https://demowebshop.tricentis.com/');

  // Step 2: Go to login page
  await page.locator('a[href="/login"]').click();
  await expect(page).toHaveURL(/.*\/login/);

  // Step 3: Fill credentials
  const emailField = page.locator('#Email');
  const passwordField = page.locator('#Password');
  await emailField.fill('babu.75@gmail.com');
  await passwordField.fill('1234567');

  // Step 4: Submit login
  const loginButton = page.locator('input[value="Log in"]');
  await loginButton.click();

  // Step 5: Verify error message

  
  const errorMessage = page.locator('.validation-summary-errors');
  await expect(errorMessage).toContainText(
    'Login was unsuccessful. Please correct the errors and try again.');
 const errorMessage1 = page.locator('.validation-summary-errors');
  await expect(errorMessage1).toContainText('The credentials provided are incorrect');
});




