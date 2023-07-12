import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'TwoWordName', async: false })
export class TwoWordNameValidator implements ValidatorConstraintInterface {
  validate(name: string, args: ValidationArguments) {
    const words = name.split(' ');
    return words.length >= 2;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Name must have at least two words.';
  }
}
