import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtGuard } from 'src/guard/jwt.guard';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //user register
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.userRegister(createUserDto);
  }

  //user login
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto)
  }

  //get user by id
  @UseGuards(JwtGuard)
  @Post(':id')
  findOne(@Param('id') id: string) {
    if(id === "null") {
      return null
    }
    return this.userService.findOne(id)
  }

  @Put('/updateUserProfile')
  updateUserProfile(
    @Body() input : any
  ){
    return this.userService.updateProfile(input)
  }
}
