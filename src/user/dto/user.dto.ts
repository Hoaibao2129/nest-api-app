export class CreateUserDto {
  name: string;
  address?: string;
  tel: string;
  email: string;
  password: string;
  roleId: number;
  cart?: string;
}
