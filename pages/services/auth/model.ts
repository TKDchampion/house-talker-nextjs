export interface SingParam {
    email: string;
    password: string;
    nickName: string;
}

export interface LoginParam {
    email: string;
    password: string;
}

export interface LoginInfo {
    access_token: string;
    email: string;
    nickName: string;
    userId: string;
}