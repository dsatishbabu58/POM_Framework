import { test as base, expect } from '@playwright/test';
import { DemoPage } from '../pages/demo.page';

export type DemoFixtures = {
  demoPage: DemoPage;
};

export const test = base.extend<DemoFixtures>({
  demoPage: async ({ page }, use) => {
    await use(new DemoPage(page));
  },
});

export { expect };
