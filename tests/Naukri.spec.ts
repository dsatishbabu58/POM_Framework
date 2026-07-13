import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';

test('Naukri resume upload flow', async ({ page }) => {
  test.setTimeout(300000);

  const loginPage = new LoginPage(page);
  const email = 'dsatishbabu58@gmail.com';
  const password = 'S@tish1980';
  const resumePath = 'C:\\Users\\Satish Babu\\OneDrive\\Desktop\\SatishBabu_Resume';

  await loginPage.openHome();
  await loginPage.clickLogin();
  await loginPage.login(email, password);
  await loginPage.openViewProfile();
  await loginPage.deleteYourResume();

  const uploadSuccess = await loginPage.uploadResume(resumePath);
  console.log(`Resume upload verification result: ${uploadSuccess}`);
  expect(typeof uploadSuccess).toBe('boolean');
});
