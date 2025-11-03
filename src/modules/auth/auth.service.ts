import { Injectable } from '@nestjs/common';
import {RegisterDTO} from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CustomerRepository } from '@models/index';

@Injectable()
export class AuthService {
  constructor(private readonly customerRepository:CustomerRepository){}
  register(RegisterDTO:RegisterDTO) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
