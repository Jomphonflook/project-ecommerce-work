import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Model } from 'mongoose';
import { IAdmin } from 'src/database/interface/admin.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {

  constructor(
    @Inject('ADMIN_MODEL')
    private adminModel: Model<IAdmin>,
    private jwtService: JwtService
  ) { }

  async adminRegister(input: CreateAdminDto): Promise<Object> {
    const checkUser = await this.adminModel.findOne({ username: input.username, isActive: true, isDelete: false })
    if (checkUser) {
      return {
        msg: "duplicate admin"
      }
    }
    const saltOrRounds = 10;
    const password = input.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    input.password = hash
    const saveAdmin = await new this.adminModel(input).save()
    return {
      id: saveAdmin.id
    };
  }

  async loginAdmin(input: LoginAdminDto) {
    const findUser = await this.adminModel.findOne({ username: input.username }).select({
      password: 1,
      username: 1,
    })
    if (!findUser) {
      throw new UnauthorizedException("username or password invalid");
    }
    const isMatch = await bcrypt.compare(input.password, findUser.password);
    if (!isMatch) {
      throw new UnauthorizedException("username or password invalid");
    }
    const payload = { id: findUser.id, username: findUser.username };
    return {
      id : findUser.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async adminProfile(id: string) {
    let result = await this.adminModel.findById(id).select({ password: 0 })
    return {
      "admin" : result,
      "role" : "admin"
    }
  }

  async updateAdminProfile(id: string, updateInput: UpdateAdminDto) {
    if(!updateInput.phone && !updateInput.username){
      return {
        msg : "No Data For Update Profile"
      }
    }
    const infoUpdate = {
      updatedAt : new Date()
    }
    if (updateInput.username) {
      Object.assign(infoUpdate, {
        username: updateInput.username,
      })
    }
    if (updateInput.phone) {
      Object.assign(infoUpdate, {
        phone: updateInput.phone,

      })
    }
    const resultUpdateProfile = await this.adminModel.findByIdAndUpdate(id, infoUpdate, { new: true }).select({ password: 0 })
    return resultUpdateProfile
  }
}
