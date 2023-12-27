import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/database/interface/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user-login.dto';
import { ICart } from 'src/database/interface/cart.interface';
import { IProduct } from 'src/database/interface/product.interface';
import { retry } from 'rxjs';
@Injectable()
export class UserService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,

    private jwtService: JwtService,

    @Inject('CART_MODEL')
    private cartModel: Model<ICart>,

    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProduct>,
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
    if (saveUser) {
      await new this.cartModel({
        userId: saveUser.id,
        price: 0,
        net_price: 0,
        totalDiscount: 0,
        cartList: []
      }).save()
    }
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
    if(!user) return null
    const cart = await this.cartModel.findOne({
      userId: user.id
    })
    let tempIndex = 0
    let cartTemp = []
    for (const obj of cart.cartList) {
      const productInfo = await this.productModel.findById(obj.productId)
      const optionProduct = productInfo?.optionProduct?.filter((e: any) => e.name === obj.option) ? productInfo?.optionProduct?.filter((e: any) => e.name === obj.option) : []
      const img_prodcut = productInfo?.img_product
      const info: any = optionProduct[0]
      const newCartObj = {
        productId: productInfo?.id,
        product_name: info?.name,
        img_product: img_prodcut,
        price: info?.price,
        unit_name: info?.unit_name,
        amountOrder: cart?.cartList[tempIndex].amount,
        discount: cart?.cartList[tempIndex].discount
      }
      cartTemp.push(newCartObj)
      tempIndex++
    }
    return {
      user: user,
      role: "user",
      cart: {
        _id: cart.id,
        cartList: cartTemp.sort()
      }
    };
  }

  async updateProfile(input: any) {
    const id = input.id
    const updateInfo = input.updateInfo
    try {
      const result = this.userModel.findByIdAndUpdate(id, {
        ...updateInfo,
        updatedAt: Date.now()
      }, { new: true }).select({ password: 0 })
      return result
    }
    catch {
      return "err update user profile"
    }
  }
}
