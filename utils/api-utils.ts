import type { APIRequestContext, APIResponse } from '@playwright/test';

export async function getUsers(request: APIRequestContext, baseUrl: string): Promise<APIResponse> {
  return request.get(`${baseUrl}/users`);
}
