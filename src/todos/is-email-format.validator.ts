// is-email-format.validator.ts
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsEmailFormat', async: false })
export class IsEmailFormat implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    // Your email validation logic here
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    return emailRegex.test(email);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not in a valid email format!`;
  }
}
