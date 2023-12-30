// is-email-format.validator.ts
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'IsEmailFormat', async: false })
  export class IsEmailFormat implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments) {
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    defaultMessage(args: ValidationArguments) {
      return `${args.property} is not in a valid email format!`;
    }
  }
  