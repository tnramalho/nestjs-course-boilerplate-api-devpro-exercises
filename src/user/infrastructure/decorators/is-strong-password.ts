import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[\w\W]{8,}$/.test(
            value,
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `Password is too weak, it must contain at least one number, one uppercase letter, one lowercase letter, and one special character.`;
        },
      },
    });
  };
}
