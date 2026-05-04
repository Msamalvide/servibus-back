
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
