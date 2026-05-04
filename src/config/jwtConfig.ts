import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions={
    secret: process.env.SECRET_KEY,
    global: true,
    signOptions: {
        expiresIn: '1h',
    }
}
