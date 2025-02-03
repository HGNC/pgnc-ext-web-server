export interface LoginCredentials {
    data: {
        accessToken: string;
        refreshToken: string;
    };
    apiVersion: string;
}
