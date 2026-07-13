import { test, expect } from '../fixtures/demoregester.fixture';
import { registrationData } from '../data/demoregester-data';
import { generateRegistrationEmail } from '../utils/demoregester-utils';

test('dempregester - register a new user', async ({ registerPage }) => {
  const email = generateRegistrationEmail();

  await registerPage.openRegistrationPage(registrationData.url);
  await registerPage.selectGender(registrationData.gender);
  await registerPage.fillFirstName(registrationData.firstName);
  await registerPage.fillLastName(registrationData.lastName);
  await registerPage.fillEmail(email);
  await registerPage.fillPassword(registrationData.password);
  await registerPage.fillConfirmPassword(registrationData.confirmPassword);
  await registerPage.submitRegistration();

  await expect(await registerPage.getSuccessMessage()).toContain(registrationData.expectedSuccessText);
});
