import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ImageFile } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { hookFormSchema } from '../../../validations/hook-form-validation';
import {
  LOVERCASE_LETTERS_REGEX,
  NUMBER_REGEX,
  SPECIAL_LETTERS_REGEX,
  UPPERCASE_LETTERS_REGEX,
  WEAK_PASSWORD_STRENGTH,
  MEDIUM_PASSWORD_STRENGTH,
} from '../../model/constants';
import { pushFormData } from '../../model/form-slice';
import { readFile } from '../../model/read-file';
import '../custom-form/custom-form.scss';

interface FormInput {
  name: string;
  age: string;
  email: string;
  gender: NonNullable<'male' | 'female' | 'other' | undefined>;
  image?: ImageFile | undefined;
  country: string;
  password: string;
  secondPassword: string;
  tc?: boolean | undefined;
}

export function HookForm() {
  const countries = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<FormInput>({
    mode: 'all',
    resolver: yupResolver<FormInput>(hookFormSchema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (data.image?.[0]) {
      const imageFile = await readFile(data.image[0] as unknown as File);
      const submitData = { ...data, image: imageFile, form: 'React Hook Form' };
      dispatch(pushFormData(submitData));
      navigate('/');
    }
  };

  const handleChange = () => {
    if (watch('password') !== watch('secondPassword')) {
      setError('secondPassword', {
        type: 'custom',
        message: 'Password mismatch',
      });
    } else {
      clearErrors('secondPassword');
    }
  };

  const checkPasswordStrength = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = event.target.value;

    setPasswordStrength(0);
    if (UPPERCASE_LETTERS_REGEX.test(password)) {
      setPasswordStrength((passwordStrength) => passwordStrength + 1);
    }
    if (LOVERCASE_LETTERS_REGEX.test(password)) {
      setPasswordStrength((passwordStrength) => passwordStrength + 1);
    }
    if (NUMBER_REGEX.test(password)) {
      setPasswordStrength((passwordStrength) => passwordStrength + 1);
    }
    if (SPECIAL_LETTERS_REGEX.test(password)) {
      setPasswordStrength((passwordStrength) => passwordStrength + 1);
    }
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="custom-form__label">
          Name
        </label>
        <input {...register('name')} type="text" id="name" />
        <span className="custom-form__error">{errors.name?.message}</span>
      </div>
      <div>
        <label htmlFor="age" className="custom-form__label">
          Age
        </label>
        <input {...register('age')} type="number" id="age" />
        <span className="custom-form__error">{errors.age?.message}</span>
      </div>
      <div>
        <label htmlFor="email" className="custom-form__label">
          E-mail
        </label>
        <input {...register('email')} type="text" id="email" />
        <span className="custom-form__error">{errors.email?.message}</span>
      </div>
      <div>
        <label htmlFor="gender" className="custom-form__label">
          Gender
        </label>
        <select {...register('gender')}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <span className="custom-form__error">{errors.gender?.message}</span>
      </div>
      <div>
        <label htmlFor="image" className="custom-form__label">
          Upload an image
        </label>
        <input {...register('image')} type="file" id="image" />
        <span className="custom-form__error">{errors.image?.message}</span>
      </div>
      <div>
        <label htmlFor="country" className="custom-form__label">
          Choose the country
        </label>
        <input
          {...register('country')}
          type="text"
          list="country-list"
          id="country"
        />
        <datalist id="country-list">
          {countries.map((country, index) => (
            <option value={country} key={index}>
              {country}
            </option>
          ))}
        </datalist>
        <span className="custom-form__error">{errors.country?.message}</span>
      </div>
      <div>
        <label htmlFor="password" className="custom-form__label">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          onChange={checkPasswordStrength}
          id="password"
        />
        <span className="custom-form__error">{errors.password?.message}</span>
      </div>
      <div>
        <label htmlFor="rpassword" className="custom-form__label">
          Repeat password
        </label>
        <input
          type="password"
          {...register('secondPassword')}
          onChange={handleChange}
          id="secondPassword"
        />
        <span className="custom-form__error">
          {errors.secondPassword?.message}
        </span>
        <div
          className={clsx(
            'password__meter',
            passwordStrength <= WEAK_PASSWORD_STRENGTH
              ? 'password__meter--weak'
              : passwordStrength <= MEDIUM_PASSWORD_STRENGTH
                ? 'password__meter--medium'
                : 'password__meter--strong'
          )}
        ></div>
        <span className="password__strength">
          {passwordStrength <= WEAK_PASSWORD_STRENGTH
            ? 'Weak password'
            : passwordStrength <= MEDIUM_PASSWORD_STRENGTH
              ? 'Medium password'
              : 'Strong password'}
        </span>
      </div>
      <div>
        <label htmlFor="tc" className="custom-form__t-and-c">
          Accept T&C <input {...register('tc')} type="checkbox" id="tc" />
        </label>
        <span className="custom-form__error">{errors.tc?.message}</span>
      </div>
      <button type="submit" className="custom-form__button" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
