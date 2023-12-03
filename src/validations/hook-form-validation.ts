import * as yup from 'yup';
import { countries } from '../components/model/country/countries';
import { ImageFile } from '../shared/types';

const validImageExtensions = ['png', 'jpeg'];
const MAX_FILE_SIZE = 512000;

export const hookFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('The name is a required field')
    .test(
      'first-letter',
      'The name must contain the first letter in uppercase',
      (name) => {
        if (name) {
          return name[0] === name[0].toUpperCase();
        }
        return false;
      }
    ),
  age: yup
    .string()
    .required('The age is a required field')
    .test(
      'is-not-negative',
      'The age must be a positive number',
      (age) => Number(age) > 0
    ),
  email: yup.string().email().required('The e-mail is a required field'),
  gender: yup
    .string<'male' | 'female' | 'other'>()
    .required('The gender is a required field'),
  image: yup
    .mixed<ImageFile>()
    .test('file-size', 'You need to provide a file', (value) => {
      return value && value.length !== 0;
    })
    .test('file-size', 'The image must be no more than 500Kb', (value) => {
      return value && value[0]?.size < MAX_FILE_SIZE;
    })
    .test('file-ext', 'The image must have a JPEG or PNG extension', (value) =>
      validImageExtensions.includes(
        value?.[0]?.name?.split('.').pop() as string
      )
    ),
  country: yup
    .string()
    .required('The country is a required field')
    .test(
      'is-valid-country',
      'The country must be selected from the list',
      (country) => countries.includes(country as string)
    ),
  password: yup
    .string()
    .required('The password is a required field')
    .min(4)
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(/[a-zа-я]/, 'Password must contain at least 1 lowercased letter')
    .matches(/[A-ZА-Я]/, 'Password must contain at least 1 uppercased letter')
    .matches(
      /[\W_]/,
      'Password must contain at least one special character (e.g., !@#$%^&*-)'
    ),
  secondPassword: yup
    .string()
    .required('The password is a required field')
    .min(4, 'Password must be at least 4 characters')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(/[a-zа-я]/, 'Password must contain at least 1 lowercased letter')
    .matches(/[A-ZА-Я]/, 'Password must contain at least 1 uppercased letter')
    .matches(
      /[\W_]/,
      'Password must contain at least one special character (e.g., !@#$%^&*-)'
    ),
  tc: yup
    .boolean()
    .test('is-true', 'The T&C field is a required', (value) => value === true),
});
