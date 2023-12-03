import { ErrorsObject } from '../../shared/types';
import { ValidationError } from 'yup';

export function getErrorMessages(errorsArray: ValidationError[]) {
  const errors = errorsArray.reduce((result: ErrorsObject, error) => {
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

    if (!result[errorKey]) {
      result[errorKey] = [];
    }

    result?.[errorKey]?.push(error.message);
    return result;
  }, {});

  return errors;
}
