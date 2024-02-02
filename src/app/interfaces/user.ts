export interface IUserAuth {
    email: string,
    password: string
};
export interface IUserReg {
    email: string,
    password: string,
    userData: {
        username: string,
        city?: string,
        district?: string
    }
}

export interface IUser {
    id: string,
    username: string,
    city?: string,
    district?: string,
    description?: string,
    img: string
};
export interface IUserResponse {
    _id: string,
    username: string,
    city?: string,
    district?: string,
    description?: string,
    img: string,
    userId: string
}

export type UserType = 'owner' | 'user' | 'unknow' | 'preview'