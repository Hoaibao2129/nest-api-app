import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { isEmpty } from '../helper/checkEmptyData';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '../helper/auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../helper/role.guard';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) { }
  @Post('')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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
