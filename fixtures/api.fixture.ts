import type { APIRequestContext } from '@playwright/test';
import { ApiPage } from '../pages/api.page';
import { api } from '../data/api-data';

export function createApiHelpers(request: APIRequestContext) {
  const apiPage = new ApiPage(request, api.baseURL);
  return { apiPage };
}
