export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserInfo {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    img: string;
}
