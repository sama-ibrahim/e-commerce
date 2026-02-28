import { PUBLIC, Roles } from '@common/decorators';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();

   const publicVal=  this.reflector.get(PUBLIC, context.getHandler())
   if(publicVal) return true;
    if (!roles.includes(request.user.role))
      throw new UnauthorizedException('not allowed');
    return true;
  }
}
