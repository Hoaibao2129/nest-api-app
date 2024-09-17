import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entities';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(createProduct: CreateProductDto): Promise<Product> {
    const checkCategory = await this.prisma.category.findUnique({
      where: {
        id: createProduct.subCategoryId,
      },
    });
    if (!checkCategory) {
      throw new BadRequestException('Category not found');
    }
    return await this.prisma.product.create({
      data: {
        productName: createProduct.productName,
        subCategoryId: createProduct.subCategoryId,
        price: createProduct.price,
        size: createProduct.size,
        total: createProduct.total,
        description: createProduct.description,
        image: createProduct.image,
        totalRating: createProduct.totalRating,
      },
    });
  }
  async getProduct(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }
}
