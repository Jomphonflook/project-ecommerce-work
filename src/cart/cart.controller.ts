import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { FirstCreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  firstCreate(@Body() createCartDto: FirstCreateCartDto) {
    return this.cartService.firstCreate(createCartDto);
  }

  @Post('/updateCart')
  updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(updateCartDto);
  }

  @Get('/')
  getCartByUserId(@Query() { userId }) {
    return this.cartService.getCartByUserId(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
