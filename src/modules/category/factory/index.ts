import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryFactoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '-',
      lower: true,
      trim: true,
    });
    category.createdBy = user._id;
    category.updatedBy = user._id;
    category.logo = createCategoryDto.logo;
    return category;
  }

  async UpdateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    user: any,
  ) {
    const oldCategory = await this.categoryRepository.getOne({ _id: id });
    if (!oldCategory) {
      throw new NotFoundException('category not found');
    }
    const newNameForCategory = updateCategoryDto.name || oldCategory.name;
    const category = new Category();
    category.name = newNameForCategory;
    category.slug = slugify(newNameForCategory, {
      replacement: '-',
      lower: true,
      trim: true,
    });
   
    category.logo = updateCategoryDto.logo || oldCategory.logo;
      category.updatedBy = user._id;
    return category;
  }
}
