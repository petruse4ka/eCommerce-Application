import { beforeEach, describe, expect, test, vi } from 'vitest';

import { UserState } from '@/store/user-state';

let userState: UserState;

beforeEach(() => {
  userState = new UserState();
});

describe('User state starting value', () => {
  test('should have unauthorized user state at initialization', () => {
    expect(userState.getAuthorizationState()).toBe(false);
  });
});

describe('Change user state value', () => {
  test('should correctly change and return user authorization state', () => {
    userState.setAuthorizationState(true);
    expect(userState.getAuthorizationState()).toBe(true);

    userState.setAuthorizationState(false);
    expect(userState.getAuthorizationState()).toBe(false);
  });
});

describe('Notify subscribers of user state change', () => {
  test('should notify subscriber on each user state change', () => {
    const mockCallback = vi.fn();
    userState.subscribe(mockCallback);

    userState.setAuthorizationState(true);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    userState.setAuthorizationState(false);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on user state change', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();

    userState.subscribe(mockCallback1);
    userState.subscribe(mockCallback2);

    userState.setAuthorizationState(true);

    expect(mockCallback1).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledTimes(1);
  });
});
