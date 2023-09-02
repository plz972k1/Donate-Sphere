import { UsersService } from './users.service';
import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '@app/common';
import { UserDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDto) {
        return this.usersService.createUser(createUserDTO);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(
        @CurrentUser() user:UserDocument
    ) {
        return user;
    }
}
