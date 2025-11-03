import { Module } from '@nestjs/common';
 import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongoModule } from '@shared/index';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters';

@Module({
  imports : [
    UserMongoModule
  ],
  controllers: [AuthController],
  providers: [AuthService , 
    // {provide : APP_FILTER, useClass :HttpExceptionFilter}
     ],
})
export class AuthModule {}
