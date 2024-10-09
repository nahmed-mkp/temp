export interface AuthenticatedUser {
    id: number;
    fullName: string;
    accessToken: string;
    refreshToken: string;
    subscriptionToken: string;
    tableauToken?: string;

    roles?: Role[];
}

export interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
}