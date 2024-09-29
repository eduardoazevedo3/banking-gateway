import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, Equal } from 'typeorm';

@Injectable()
@ValidatorConstraint({ name: 'UniqueRecord', async: true })
export class UniqueRecordValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const where = {};
    const [context] = args.constraints;
    if (!value) return false;

    context.scope.forEach((field) => {
      where[field] = Equal(args.object[field]);
    });

    const isRecordExists = await this.connection.manager.findOneBy(
      context.entity,
      where,
    );

    return !isRecordExists;
  }

  defaultMessage(): string {
    return 'Record already exists';
  }
}

export const IsUnique = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [validationOptions.context],
      validator: UniqueRecordValidator,
    });
  };
};
