import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/database/interface/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
import { ICart } from 'src/database/interface/cart.interface';
@Injectable()
export class UserService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,

    private jwtService: JwtService,

    @Inject('CART_MODEL')
    private cartModel: Model<ICart>,
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
    console.log("0")
    if (saveUser) {
      await new this.cartModel({
        userId: saveUser.id,
        price: 0,
        net_price: 0,
        totalDiscount: 0,
        cartList: []
      }).save()
    }
    console.log("1")
    return {
      id: saveUser.id
    };;
  }

  async loginUser(input: LoginUserDto) {
    const findUser = await this.userModel.findOne({ username: input.username }).select({
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
      id: findUser.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(id: any) {
    const user = await this.userModel.findById(id).select({
      password: 0,
    })
    const cart = await this.cartModel.findOne({
      userId : user.id
    })
    console.log(user)
    console.log(cart)
    return {
      user: user,
      cart : cart
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
