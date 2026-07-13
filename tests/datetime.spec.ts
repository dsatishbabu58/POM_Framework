import { test, expect } from '@playwright/test';

test('log current date and time', async ({ page }) => {
  // Navigate to a sample page
  // await page.goto('https://example.com');

  // Get current date and time
  const now = new Date();

  // Format it as needed
  const formatted = now.toLocaleString(); // e.g., "24/06/2026, 6:59:00 PM"

 console.log('Current Date & Time:', formatted);

  // You can also use it in assertions or save it in reports
  expect(formatted).not.toBeNull();
});
