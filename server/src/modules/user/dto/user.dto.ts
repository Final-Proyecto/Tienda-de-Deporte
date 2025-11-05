export class RegisterUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}

export class LoginUserDto {
  constructor(public email: string, public password: string) {}
}
