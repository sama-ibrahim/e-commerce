import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, adminSchema, Seller, sellerSchema, User, userSchema } from './models';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [devConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('db').url,
      }),
    }),

    // MongooseModule.forFeature([
    //   { name: User.name, schema: userSchema,
    //      discriminators: [
    //       {
    //         name:Admin.name,
    //         schema:adminSchema,

    //       },
    //       {
    //         name:Seller.name,
    //         schema:sellerSchema,
    //       }

    //     ] },
    // ]),

    AuthModule,
    ProductModule,
    CategoryModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
