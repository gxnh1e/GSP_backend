declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends ExtendUser {}
  }
}

export interface ExtendUser {
  email: string;
  username: string;
}
