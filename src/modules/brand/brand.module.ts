import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory/brand.factory';

@Module({
  controllers: [BrandController],
  providers: [BrandService , BrandFactoryService],
})
export class BrandModule {}
