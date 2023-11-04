declare global {
    namespace Express {
        export interface User extends ExtendUser { }
    }
}

export interface ExtendUser {
    email: string;
    username: string;
}