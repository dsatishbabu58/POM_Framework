import { test as base, expect } from '@playwright/test';
import { DemoRegisterPage } from '../pages/demoregester.page';

export type DemoRegisterFixtures = {
  registerPage: DemoRegisterPage;
};

export const test = base.extend<DemoRegisterFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new DemoRegisterPage(page));
  },
});

export { expect };
