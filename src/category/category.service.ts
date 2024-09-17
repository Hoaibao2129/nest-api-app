import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma.service';
import { CategoryEntity } from './entities/category.entities';
import { UpdateCategoryDto } from './dto/update-category';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.prisma.category.create({
      data: {
        categoryName: createCategoryDto.categoryName,
      },
    });
  }

  async getAllCategories(): Promise<Array<CategoryEntity>> {
    return this.prisma.category.findMany();
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const categoryCheckExist = await this.prisma.category.findUnique({
      where: {
        id: updateCategoryDto.id,
      },
    });
    if (!categoryCheckExist) {
      throw new BadRequestException('Category not found');
    }
    return this.prisma.category.update({
      where: {
        id: updateCategoryDto.id,
      },
      data: {
        categoryName: updateCategoryDto.categoryName,
      },
    });
  }
}
