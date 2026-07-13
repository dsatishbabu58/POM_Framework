import { type UserCredentials } from '../pages/login.page';

export function getDemoWebsiteUrl(): string {
  return process.env.DEMO_BASE_URL ?? 'https://demowebshop.tricentis.com/';
}

export function getDefaultUserCredentials(overrides?: Partial<UserCredentials>): UserCredentials {
  return {
    username: process.env.DEMO_USERNAME ?? 'babu.75@gmail.com',
    password: process.env.DEMO_PASSWORD ?? '12345678',
    ...overrides,
  };
}
