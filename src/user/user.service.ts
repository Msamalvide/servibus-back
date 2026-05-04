import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...rest} = createUserDto
      const hashPassword: string = await bcrypt.hash(password,10)
      const newUser: User | null = this.userRepository.create({...rest, password:hashPassword});
      const saveUser: User | null = await this.userRepository.save(newUser);
      return saveUser;
    } catch (error) {
        throw new InternalServerErrorException('Error al crear el usuario');      
    }
  }
}
