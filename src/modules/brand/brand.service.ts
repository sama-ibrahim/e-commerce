import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from '@models/index';
import { Brand } from './entities/brand.entity';
import { message } from '@common/constant';
 
@Injectable()
export class BrandService {
  constructor(private readonly brandRepository:BrandRepository){}

  //create 
  async create(brand:Brand) {
    
    //check brand existence
    const brandExist = await this.brandRepository.getOne({slug:brand.slug})
    if(brandExist){
      throw new ConflictException(message.Brand.alreadyExist)
    }
    
   return await this.brandRepository.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
