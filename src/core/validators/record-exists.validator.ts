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
@ValidatorConstraint({ name: 'RecordExists', async: true })
export class RecordExistsValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const where = {};
    const [context] = args.constraints;
    if (!value) return false;

    if (context.scope) {
      Object.keys(context.scope).forEach((key) => {
        where[key] = Equal(args.object[context.scope[key]]);
      });
    }

    const isRecordExists = await this.connection.manager.findOneBy(
      context.entity,
      where,
    );

    return !!isRecordExists;
  }

  defaultMessage(): string {
    return 'Record already exists';
  }
}

export const IsEntityExists = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [validationOptions.context],
      validator: RecordExistsValidator,
    });
  };
};
