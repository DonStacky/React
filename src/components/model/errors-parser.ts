import { ErrorsObject } from '../../shared/types';
import { ValidationError } from 'yup';

export function errorParser(errorsArray: ValidationError[]) {
  const errors = errorsArray.reduce((result, error) => {
    let errorKey = error.path as keyof ErrorsObject;
    if (errorKey === 'age') {
      if (error.params?.originalValue === '') {
        error.message = 'The age is a required field';
      } else {
        error.message = 'The age must be a positive number';
      }
    }

    if (errorKey === 'image.name' || errorKey === 'image.size') {
      errorKey = 'image';
    }

    if (!result[errorKey]) result[errorKey] = [];
    (result[errorKey] as string[]).push(error.message);
    return result;
  }, {} as ErrorsObject);

  return errors;
}
