import { test, expect } from '@playwright/test';

test('get all link and button names', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  // Example: click Register link
  await page.getByRole('link', { name: 'Register' }).click();

  // Get all <a> elements
//   const links = await page.locator('a').all();
//   for (const link of links) {
//     const text = await link.innerText();
//     console.log('link :', text.trim());
//   }

  // Get all <button> elements
  const buttons = await page.locator('button').all();
  for (const button of buttons) {
    const label = await button.innerText();
    console.log('button :', label.trim());
  }
});
