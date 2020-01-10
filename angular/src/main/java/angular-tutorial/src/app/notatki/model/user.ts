export class User {
  login: string;
  password: string;
  /**
   * 1 - logged in
   */
  status: number;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
