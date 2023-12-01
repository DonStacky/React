import * as yup from 'yup';
import { countries } from '../components/model/country/countries';

const validImageExtensions = ['png', 'jpeg'];
const MAX_FILE_SIZE = 512000;

export const customFormSchema = yup.object().shape({
  name: yup
    .string()
    .test(
      'first-letter',
      'The name must contain the first letter in uppercase',
      (name) => {
        if (name) {
          return name[0] === name[0].toUpperCase();
        }
        return false;
      }
    )
    .required('The name is a required field'),
  age: yup.number().positive(),
  email: yup.string().email().required('The e-mail is a required field'),
  gender: yup
    .string<'male' | 'female' | 'other'>()
    .required('The gender is a required field'),
  image: yup.object().shape({
    name: yup
      .string()
      .test(
        'is-valid-image-ext',
        'The image must have a JPEG or PNG extension',
        (name) =>
          validImageExtensions.includes(name?.split('.').pop() as string)
      )
      .required('The image is a required field'),
    size: yup
      .number()
      .test(
        'is-valid-image-size',
        'The image must be no more than 500Kb',
        (size) => (size || 0) <= MAX_FILE_SIZE
      ),
  }),
  country: yup
    .string()
    .test(
      'is-valid-country',
      'The country must be selected from the list',
      (country) => countries.includes(country as string)
    )
    .required('The country is a required field'),
  password: yup
    .string()
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(/[a-zа-я]/, 'Password must contain at least 1 lowercased letter')
    .matches(/[A-ZА-Я]/, 'Password must contain at least 1 uppercased letter')
    .matches(
      /[\W_]/,
      'Password must contain at least one special character (e.g., !@#$%^&*-)'
    )
    .min(4)
    .required('The password is a required field'),
  rpassword: yup
    .string()
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(/[a-zа-я]/, 'Password must contain at least 1 lowercased letter')
    .matches(/[A-ZА-Я]/, 'Password must contain at least 1 uppercased letter')
    .matches(
      /[\W_]/,
      'Password must contain at least one special character (e.g., !@#$%^&*-)'
    )
    .min(4, 'Password must be at least 4 characters')
    .required('The password is a required field'),
  tc: yup
    .mixed()
    .test('is-true', 'The T&C field is a required', (value) => value === true),
});
