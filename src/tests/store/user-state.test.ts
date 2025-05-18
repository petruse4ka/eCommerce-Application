import { beforeEach, describe, expect, test, vi } from 'vitest';

import { UserState } from '@/store/user-state';

let userState: UserState;

beforeEach(() => {
  userState = new UserState();
});

describe('Test user state starting value', () => {
  test('should have unauthorized user state at initialization', () => {
    expect(userState.getAuthorizationState()).toBe(false);
  });
});

describe('Test user state value change', () => {
  test('should correctly change and return user authorization state', () => {
    userState.setAuthorizationState(true);
    expect(userState.getAuthorizationState()).toBe(true);

    userState.setAuthorizationState(false);
    expect(userState.getAuthorizationState()).toBe(false);
  });
});

describe('Test notification of subscribers of user state change', () => {
  test('should notify subscriber on each user state change', () => {
    const mockCallback = vi.fn();
    userState.subscribe(mockCallback);

    userState.setAuthorizationState(true);
    expect(mockCallback).toHaveBeenCalledTimes(1);

    userState.setAuthorizationState(false);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should notify all subscribers on user state change', () => {
    const mockFirstCallback = vi.fn();
    const mockSecondCallback = vi.fn();

    userState.subscribe(mockFirstCallback);
    userState.subscribe(mockSecondCallback);

    userState.setAuthorizationState(true);

    expect(mockFirstCallback).toHaveBeenCalledTimes(1);
    expect(mockSecondCallback).toHaveBeenCalledTimes(1);
  });
});
