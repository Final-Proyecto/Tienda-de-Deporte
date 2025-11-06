export class RegisterUserDto {
    name;
    email;
    password;
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
export class LoginUserDto {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
//# sourceMappingURL=user.dto.js.map