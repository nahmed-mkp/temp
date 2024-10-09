export interface IUserCredential {
    email: string;
    password: string;
}

export interface IAuthenticatedUser {
    email: string;
    name: string;
    description: string;
    ntName: string;
    userId: number;
    initials: string;
    accessToken: string;
    subscriptionToken: string;
}


