import { describe, expect, test, vi } from 'vitest';

import API from '@/api/api';

describe('API', () => {
  test('should handle successful login', async () => {
    const mockFetchRequest = vi.fn();
    globalThis.fetch = mockFetchRequest;

    mockFetchRequest.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ access_token: 'test-access-token' }),
    });

    mockFetchRequest.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ customer: { id: 'test-id' } }),
    });

    const result = await API.userSignInResponse({
      email: 'testmail@testdomain.ru',
      password: '123qweQWE',
    });

    expect(result).toBe('test-id');
  });

  test('should handle failed login', async () => {
    const mockFetchRequest = vi.fn();
    globalThis.fetch = mockFetchRequest;

    mockFetchRequest.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid credentials' }),
    });

    await expect(
      API.userSignInResponse({
        email: 'testmail@testdomain.ru',
        password: '123qweQWE',
      })
    ).rejects.toThrow('Invalid credentials');
  });
});
