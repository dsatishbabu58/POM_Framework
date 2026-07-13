import { test, expect } from '@playwright/test';

test('count and display selected days text', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Extract names from the labels associated with each checkbox
//   const dayNames = await page.$$eval('input[type="checkbox"][id]', (checkboxes) => {
//     return checkboxes.map((checkbox) => {
//       const label = document.querySelector(`label[for="${checkbox.id}"]`);
//       return label ? label.textContent?.trim() || "" : "";
  const Selectnames = await page.$$eval('input[type="checkbox"][id]', (checkboxes) => {
    return checkboxes.map((checkbox) => {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      return label ? label.textContent?.trim() || "" : "";

    });
  });

  // Display the count and names
  console.log("Count of days:", Selectnames.length);
  console.log("Day names:", Selectnames.join(", "));

  // Optional assertion
//   expect(dayNames.length).toBe(7);
//   expect(dayNames).toEqual([
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ]);
});





test('Extract Names and Count Checkboxes from Pagination Table', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Scope only to the Pagination Web Table
  // Inspect the table in DevTools: it usually has id="productTable" or similar
  const rows = await page.$$('#productTable tbody tr'); 

  // Extract Names (second column)
  const names: string[] = [];
  for (const row of rows) {
    const nameCell = await row.$('td:nth-child(2)');
    if (nameCell) {
      const text = await nameCell.textContent();
      if (text) names.push(text.trim());
    }
  }

  // Count checkboxes (last column)
  const checkboxes = await page.$$('#productTable tbody tr td input[type="checkbox"]');
  const checkboxCount = checkboxes.length;

  // Output results
  console.log('Names:', names);
  console.log('Number of checkboxes:', checkboxCount);

  // Assertions
//   expect(names.length).toBe(5);
//   expect(checkboxCount).toBe(5);
});