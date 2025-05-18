class UserState {
  private isAuthorized: boolean;

  constructor() {
    this.isAuthorized = false;
  }

  public getAuthorizationState(): boolean {
    return this.isAuthorized;
  }

  public setAuthorizationState(value: boolean): void {
    this.isAuthorized = value;
  }
}

export const userState = new UserState();
