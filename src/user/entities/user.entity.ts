import {Role} from 'src/enums/ROLE'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        unique: true
    })
    email:string

    @Column()
    username:string

    @Column()
    password: string

    @Column({
        default: Role.ADMIN
    })
    role: Role

    @CreateDateColumn()
    crated: Date
}   
