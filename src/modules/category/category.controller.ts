import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth, Public, User } from '@common/decorators';
import { CategoryFactoryService } from './factory';

@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  //create

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @User() user: any,
  ) {
    const category = await this.categoryFactoryService.createCategory(
      createCategoryDto,
      user,
    );
    const createdCategory = await this.categoryService.create(category);
    return {
      success: true,
      message: 'category created successfullly!',
      data: createdCategory,
    };
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  //findOne
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
   const category= await this.categoryService.findOne(id);
   return{
    success:true,
    data:category
   }
  }

  //update

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user:any
  ) {
    const category = await this.categoryFactoryService.UpdateCategory(
      id,
      updateCategoryDto,
      user
    );
    const updatedCategory = await this.categoryService.update(id, category);
    return {
      success: true,
      message: 'category updated successfully',
      data: updatedCategory,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
