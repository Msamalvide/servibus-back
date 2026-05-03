import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser: User | null = this.userRepository.create(createUserDto);
      const saveUser: User | null = await this.userRepository.save(newUser);
      return saveUser;
    } catch (error) {
        throw new InternalServerErrorException('Error al crear el usuario');      
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
