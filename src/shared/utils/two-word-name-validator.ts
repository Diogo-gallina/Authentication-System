import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'TwoWordName', async: false })
export class TwoWordNameValidator implements ValidatorConstraintInterface {
  validate(name: string) {
    const words = name.split(' ');
    return words.length >= 2;
  }

  defaultMessage() {
    return 'Name must have at least two words.';
  }
}
