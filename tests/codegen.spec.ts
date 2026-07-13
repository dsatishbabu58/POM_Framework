import { test, expect } from '@playwright/test';

test('Register New User', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('textbox', { name: 'First name:' }).fill('babu');
  await page.getByRole('textbox', { name: 'Last name:' }).fill('1');
  await page.getByRole('textbox', { name: 'Email:' }).fill('abbbbbbbbbbbbbkkk1@gmail.com');
   await page.getByRole('textbox', { name: 'Password:', exact: true }).fill('1234567');
  await page.getByRole('textbox', { name: 'Confirm password:' }).fill('1234567');
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await page.getByRole('button', { name: 'Register' }).click();
  
  const duplicateError = page.getByText('The specified email already');

if (await duplicateError.isVisible()) {
  await expect(duplicateError).toBeVisible();
} else {
  // fallback if the error is not shown
  await expect(page.locator('.result')).toHaveText('Your registration completed');
}
//   await expect(page.getByText('The specified email already')).toBeVisible();
});
