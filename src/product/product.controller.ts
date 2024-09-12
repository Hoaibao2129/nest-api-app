import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { isEmpty } from 'src/helper/checkEmptyData';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/helper/auth.guard';

@Controller('product')
@UseGuards(AuthGuard)
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
