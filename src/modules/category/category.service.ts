import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '@models/index';
import { Types } from 'mongoose';
import { MESSAGE } from '@common/constant';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  //create

  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });
    // fail case
    if (categoryExist) throw new ConflictException(MESSAGE.Category.alreadyExist);
    //success
    return await this.categoryRepository.create(category);
  }

  findAll() {
    return `This action returns all category`;
  }

  // find one

  async findOne(id: string | Types.ObjectId) {
    const category = await this.categoryRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy', select: '-password -otp -otpExpiry' },
          { path: 'updatedBy' ,select: '-password -otp -otpExpiry'},
        ],
      },
    );
    if (!category) {
      throw new NotFoundException(MESSAGE.Category.notFound);
    }
    return category;
  }

  //update

  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
      _id: { $ne: id },
    });
    if (categoryExist) {
      throw new ConflictException('category already exists!');
    }
    return await this.categoryRepository.updateOne({ _id: id }, category, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
