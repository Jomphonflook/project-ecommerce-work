import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto
  ) {
    if(createProduct.promotionId === 'none') {
      delete createProduct['promotionId']
    }
    return this.productService.createProduct(createProduct)
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto
  ) {
    if(UpdateProductDto.promotionId === 'none') {
      UpdateProductDto.promotionId = 'none'
    }
    return await this.productService.updateProduct(id, UpdateProductDto)
  }

  @Post('/all')
  async getAllProduct(
    @Body() filter: any
  ){
    return await this.productService.getAllProduct(filter)
  }
}
