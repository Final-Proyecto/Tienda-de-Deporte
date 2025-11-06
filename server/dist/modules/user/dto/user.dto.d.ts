export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    constructor(name: string, email: string, password: string);
}
export declare class LoginUserDto {
    email: string;
    password: string;
    constructor(email: string, password: string);
}
