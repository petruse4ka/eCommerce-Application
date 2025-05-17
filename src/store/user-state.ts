class UserState {
  private isAuthorized: boolean;

  constructor() {
    this.isAuthorized = false;
  }

  public getIsAuthorized(): boolean {
    return this.isAuthorized;
  }

  public setAuthorized(value: boolean): void {
    this.isAuthorized = value;
  }
}

export const userState = new UserState();
