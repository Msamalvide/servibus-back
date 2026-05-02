import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email:string;

    @IsString()
    username:string;

    @IsString()
    @MinLength(6, {message: 'La contraseña debe tener al menos seis caracteres'})
    @MaxLength(20)
    @Matches(/(?=.*[0-9])/,{message:'La contraseña debe tener un número'})
    password:string;
    
}
