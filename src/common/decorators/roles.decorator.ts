
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//export const Roles = Reflector.createDecorator<string[]>();
export const ROLES= 'roles'
export const Roles =(value:string[])=> SetMetadata(ROLES , value)

/**
 * @Roles(['admin', 'customer'])
 */