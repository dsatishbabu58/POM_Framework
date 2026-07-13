import type { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiPage {
  constructor(private request: APIRequestContext, private baseUrl: string) {}

  getUsers(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/users`);
  }
}
