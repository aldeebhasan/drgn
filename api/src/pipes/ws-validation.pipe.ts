import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { WsException } from '@nestjs/websockets';

function getAllConstraints(errors: ValidationError[]): { [key: string]: any } {
  const constraints = {};
  for (const error of errors) {
    if (error.constraints) {
      constraints[error.property] = Object.values(error.constraints);
    }

    if (error.children?.length) {
      constraints[error.property] = getAllConstraints(error.children);
    }
  }
  return constraints;
}

function getCustomValidationError(message: { [key: string]: any }) {
  return {
    statusCode: 422,
    message,
    error: 'Unprocessable Entity',
  };
}

export const validationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors: ValidationError[]) =>
    new WsException(getCustomValidationError(getAllConstraints(errors))),
});
