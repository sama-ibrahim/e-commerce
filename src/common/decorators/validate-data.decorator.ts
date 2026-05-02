import { DiscountType } from '@common/types';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

 
export function IsValidToDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidToDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,

      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any; // entire DTO instance
          const { fromDate} = obj;

          if ( value /* toDate*/ < fromDate ) {
            return false;
          }
 
          return true; 
        },

        defaultMessage(args: ValidationArguments) {

          const obj = args.object as any;
          const { fromDate , toDate } = obj;
          
          if ( toDate <fromDate ) {
            return 'to-date must be after or equal to from-date'
          }
           
          return 'Invalid to date';
        },
      },
    });
  };
}
