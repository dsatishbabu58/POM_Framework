// import { test, expect } from '@playwright/test';

// test("login", async ({ page }) => {
//   await page.goto('https://demoqa.com/select-menu');
  
//   await page.evaluate(() => {
//     window.scrollBy(0, 500); 
//      });
// const multilistbox = page.locator('#cars')

// await multilistbox.selectOption(['Volvo','Saab'])
// // await expect(multilistbox).toHaveText([/Volvo/, /Saab/]);
// await expect(multilistbox.locator('option:checked')).toHaveText(['Volvo', 'Saab']);
// await page.waitForTimeout(5000)

// await multilistbox.selectOption([{ value: 'opel' }, { value: 'audi' }]);
// await expect(multilistbox).toHaveValues([/opel/, /audi/]);

// // await expect(multilistbox).toHaveValues([/audi/,/opel/])
// await page.waitForTimeout(5000)
// await multilistbox.selectOption([{index:0},{index:2},{index:1},{index:3}])

// await page.waitForTimeout(5000)
// });

import { test, expect } from '@playwright/test';

test("login", async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');
  
//   await page.evaluate(() => {
//     window.scrollBy(0, 500); 
//      });
await page.locator('.css-19bb58m').first().click()
await page.locator('#react-select-2-option-0-0').click()
await page.waitForTimeout(5000)

await page.locator('.css-19bb58m').first().click()
await page.locator('#react-select-2-option-0-1').click()
await page.waitForTimeout(5000)

await page.locator('.css-1s9izoc').first().click()
await page.locator('#react-select-1-option-1-0').click()
await page.waitForTimeout(5000)

await page.locator('.css-1s9izoc').first().click()
await page.locator('#react-select-1-option-1-1').click()
await page.waitForTimeout(5000)

});