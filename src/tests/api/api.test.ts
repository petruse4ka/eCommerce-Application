import API from '@/api';
import { userState } from '@/store/user-state';

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

    mockFetchRequest.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 'mock-cart-id',
          version: 1,
        }),
    });

    vi.spyOn(userState, 'getTokenState').mockReturnValue('mock-token');
    const setAuth = vi.spyOn(userState, 'setAuthorizationState').mockImplementation(() => {});

    await API.userSignInResponse({
      userInfo: {
        email: 'testmail@testdomain.ru',
        password: '123qweQWE',
      },
      isLogin: true,
    });

    expect(setAuth).toHaveBeenCalledTimes(1);
    expect(setAuth).toHaveBeenCalledWith(true);
  });
});

describe('API', () => {
  test('should handle failed login', async () => {
    const mockFetchRequest = vi.fn();
    globalThis.fetch = mockFetchRequest;

    mockFetchRequest.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid credentials' }),
    });

    await expect(
      API.userSignInResponse({
        userInfo: {
          email: 'testmail@testdomain.ru',
          password: '123qweQWE',
        },
        isLogin: true,
      })
    ).rejects.toThrow('Invalid credentials');
  });
});
