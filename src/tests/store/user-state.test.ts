import { beforeEach, describe, expect, test, vi } from 'vitest';

import { userState } from '@/store/user-state';

describe('User state', () => {
  beforeEach(() => {
    userState.setAuthorizationState(false);
    userState.unsubscribe(() => {});
  });

  test('should be unauthorized at initialization', () => {
    expect(userState.getAuthorizationState()).toBe(false);
  });

  test('should correctly change and return state', () => {
    userState.setAuthorizationState(true);
    expect(userState.getAuthorizationState()).toBe(true);

    userState.setAuthorizationState(false);
    expect(userState.getAuthorizationState()).toBe(false);
  });

  test('should notify subscriber on each state change', () => {
    const mockCallback = vi.fn();
    userState.subscribe(mockCallback);

    userState.setAuthorizationState(true);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    userState.setAuthorizationState(false);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on state change', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    userState.subscribe(mockFirstCallback);
    userState.subscribe(mockSecondCallback);

    userState.setAuthorizationState(true);

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
