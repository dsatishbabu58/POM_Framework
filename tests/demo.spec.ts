import { test, expect } from '../fixtures/demo.fixture';
import { registrationScenarios } from '../data/demo-data';

for (const scenario of registrationScenarios) {
  test(`registers and logs in a ${scenario.gender.toLowerCase()} user - ${scenario.firstName}`, async ({ demoPage }) => {
    await demoPage.openRegistrationPage(scenario.url);
    await demoPage.selectGender(scenario.gender);
    await demoPage.fillFirstName(scenario.firstName);
    await demoPage.fillLastName(scenario.lastName);
    await demoPage.fillEmail(scenario.email);
    await demoPage.fillPassword(scenario.password);
    await demoPage.fillConfirmPassword(scenario.confirmPassword);
    await demoPage.submitRegistration();

    await expect(await demoPage.getSuccessMessage()).toContain(scenario.expectedSuccessText);

    await demoPage.logout();
    await demoPage.openLoginPage();
    await demoPage.fillLoginEmail(scenario.email);
    await demoPage.fillLoginPassword(scenario.password);
    await demoPage.submitLogin();

    await expect(await demoPage.isLoggedIn()).toBeTruthy();
    await expect(await demoPage.getLogoutLinkText()).toContain(scenario.expectedLoginSuccessText);
  });
}

