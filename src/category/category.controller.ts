import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { isEmpty } from '../helper/checkEmptyData';
import { UpdateCategoryDto } from './dto/update-category';
import { AuthGuard } from '../helper/auth.guard';
@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    if (isEmpty(createCategoryDto)) {
      throw new BadRequestException('Category data can not be empty');
    }
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('')
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Put('')
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    if (isEmpty(updateCategoryDto)) {
      throw new BadRequestException('Category data can not be empty');
    }
    return this.categoryService.updateCategory(updateCategoryDto);
  }
}
