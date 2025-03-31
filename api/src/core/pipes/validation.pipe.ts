import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';

function getAllConstraints(
  errors: ValidationError[],
  parent?: string,
): { [key: string]: any } {
  let constraints = {};
  for (const error of errors) {
    const property = parent ? `${parent}.${error.property}` : error.property;
    if (error.constraints) {
      constraints[property] = Object.values(error.constraints);
    }

    if (error.children?.length) {
      const childrenConstraints = getAllConstraints(
        error.children,
        error.property,
      );
      constraints = { ...constraints, ...childrenConstraints };
    }
  }
  return constraints;
}

export const validationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const formatedErrors = getAllConstraints(errors);
    return new UnprocessableEntityException(formatedErrors);
  },
});
