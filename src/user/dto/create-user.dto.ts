import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Email del usuario',
        example: 'martinsamalvide@gmail.com'
    })
    @IsEmail()
    @IsString()
    email:string;

    
    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'OficinaBaron'
    })
    @IsString()
    username:string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'ColBaron123'
    })
    @IsString()
    @MinLength(6, {message: 'La contraseña debe tener al menos seis caracteres'})
    @MaxLength(20)
    @Matches(/(?=.*[0-9])/,{message:'La contraseña debe tener un número'})
    password:string;
    
}
