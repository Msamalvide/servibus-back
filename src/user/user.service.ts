
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El correo electrónico ya está en uso');      
      }
      throw new InternalServerErrorException('Error al crear el usuario');      
    }
  }

  async deleteUser(id:string): Promise<void>{
    try {
      const user: User | null = await this.userRepository.findOne({where:{id}})
      if(!user){
        throw new NotFoundException('Usuario no encontrado')
      }
      await this.userRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');      
    }
  }
}
