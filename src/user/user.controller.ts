import { Controller,Post,Body, UseInterceptors, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password/exclude-password.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ExcludePasswordInterceptor)
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete()
  delete(){
    
  }

}
