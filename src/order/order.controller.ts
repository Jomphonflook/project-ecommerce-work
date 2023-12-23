import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { verifyOrderDto } from './dto/verify-order.dto';
import { SearchOrderDto } from './dto/search-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post("/verifyOrder")
  async verifyOrder(
    @Body() verifyOrder: verifyOrderDto
  ) {
    return await this.orderService.verifyOrder(verifyOrder)
  }

  @Put("/purchaseOrder")
  async purchaseOrder(
    @Body() purchaseInput: any
  ) {
    return await this.orderService.purchaseOrder(purchaseInput)
  }

  @Post("/orderInfo")
  async getOrderInfo(
    @Body() input : any
  ){
      const id = input.orderId
      return await this.orderService.getOrderInfo(id)
  }

  @Post("/getOrderByUserId")
  async getOrderByUserId(
    @Body() input : any
  ){
      return await this.orderService.getOrderByUserId(input)
  }

  @Put("/cancelOrder")
  async cancelOrder(
    @Body() input: any
  ){
    return await this.orderService.cancelOrder(input)
  }

  @Post("/searchOrder")
  async searchOrder(
    @Body() input : SearchOrderDto
  ){
    return await this.orderService.searchOrder(input)
  }
}
