import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor (private readonly usersRepository: UsersRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto);

        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        });
    }

    async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({email: createUserDto.email})
        } catch (error) {
            return;
        }

        throw new UnprocessableEntityException('Email already exists.');
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({email});
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid) {
            throw new UnauthorizedException('Credentials is not valid.');
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto);
    }

}
