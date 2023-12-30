import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsEmailFormat implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
