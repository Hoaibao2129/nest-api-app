import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
    id: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsPhoneNumber('KE', { message: 'Please enter a valid phone number' })
    @IsOptional()
    tel?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;
}