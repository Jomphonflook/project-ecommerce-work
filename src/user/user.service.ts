import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/database/interface/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private jwtService: JwtService
  ) { }

  async userRegister(createUserDto: CreateUserDto) {
    const checkUser = await this.userModel.findOne({ username: createUserDto.username, isActive: true, isDelete: false })
    if (checkUser) {
      return {
        msg: "duplicate user"
      }
    }
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash
    const saveUser = await new this.userModel(createUserDto).save()
    return {
      id: saveUser.id
    };;
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
