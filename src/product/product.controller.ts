import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { isEmpty } from 'src/helper/checkEmptyData';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    if (isEmpty(createProductDto)) {
      throw new BadRequestException('User data can not be empty');
    }
    return this.productService.createProduct(createProductDto);
  }

  @Get('')
  async getProduct() {
    return this.productService.getProduct();
  }
}
