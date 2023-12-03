import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataObject, ErrorsObject } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { customFormSchema } from '../../../validations/custom-form-validation';
import {
  LOVERCASE_LETTERS_REGEX,
  NUMBER_REGEX,
  SPECIAL_LETTERS_REGEX,
  UPPERCASE_LETTERS_REGEX,
  MEDIUM_PASSWORD_STRENGTH,
  WEAK_PASSWORD_STRENGTH,
} from '../../model/constants';
import { getErrorMessages } from '../../model/errors-parser';
import { pushFormData } from '../../model/form-slice';
import { readFile } from '../../model/read-file';
import './custom-form.scss';

export function CustomForm() {
  const [errors, setErrors] = useState<ErrorsObject>({ name: [] });
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const countries = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const genderInput = useRef<HTMLSelectElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const countryInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const secondPasswordInput = useRef<HTMLInputElement>(null);
  const tcInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const customFormData: DataObject = {
      name: nameInput.current?.value,
      age: ageInput.current?.value,
      email: emailInput.current?.value,
      gender: genderInput.current?.value,
      image: {
        name: imageInput.current?.files?.[0]?.name,
        size: imageInput.current?.files?.[0]?.size,
      },
      country: countryInput.current?.value,
      password: passwordInput.current?.value,
      secondPassword: secondPasswordInput.current?.value,
      tc: tcInput.current?.checked,
      form: 'Uncontrolled form',
    };

    await customFormSchema
      .validate(customFormData, { abortEarly: false })
      .then(async () => {
        setErrors(() => ({}));
        if (handleChange()) {
          const imageFile = await readFile(
            imageInput.current?.files?.[0] as File
          );
          dispatch(pushFormData({ ...customFormData, image: imageFile }));
          navigate('/');
        }
      })
      .catch((e) => {
        const errorObject = getErrorMessages(e.inner);
        setErrors(errorObject);
      });
  };

  const handleChange = () => {
    if (passwordInput.current?.value !== secondPasswordInput.current?.value) {
      setErrors({ ...errors, secondPassword: ['Password mismatch'] });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const checkPasswordStrength = (password: string) => {
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
    <form className="custom-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="custom-form__label">
          Name
        </label>
        <input type="text" id="name" ref={nameInput} />
        <span className="custom-form__error">
          {errors.name && errors.name.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="age" className="custom-form__label">
          Age
        </label>
        <input type="text" id="age" ref={ageInput} />
        <span className="custom-form__error">
          {errors.age && errors.age.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="email" className="custom-form__label">
          E-mail
        </label>
        <input type="text" id="email" ref={emailInput} />
        <span className="custom-form__error">
          {errors.email && errors.email.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="gender" className="custom-form__label">
          Gender
        </label>
        <select id="gender-opt" ref={genderInput}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <span className="custom-form__error">
          {errors.gender && errors.gender.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="image" className="custom-form__label">
          Upload an image
        </label>
        <input type="file" id="image" ref={imageInput} />
        <span className="custom-form__error">
          {errors.image && errors.image.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="country" className="custom-form__label">
          Choose the country
        </label>
        <input
          type="text"
          id="country"
          list="country-list"
          ref={countryInput}
        />
        <datalist id="country-list">
          {countries.map((country, index) => (
            <option value={country} key={index}>
              {country}
            </option>
          ))}
        </datalist>
        <span className="custom-form__error">
          {errors.country && errors.country.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="password" className="custom-form__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          ref={passwordInput}
          onChange={() =>
            checkPasswordStrength(passwordInput.current?.value || '')
          }
        />
        <span className="custom-form__error">
          {errors.password && errors.password.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="rpassword" className="custom-form__label">
          Repeat password
        </label>
        <input
          type="password"
          id="rpassword"
          ref={secondPasswordInput}
          onChange={handleChange}
        />
        <span className="custom-form__error">
          {errors.secondPassword && errors.secondPassword.at(-1)}
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
        <label htmlFor="t&c" className="custom-form__t-and-c">
          Accept T&C <input type="checkbox" id="t&c" ref={tcInput} />
        </label>
        <span className="custom-form__error">
          {errors.tc && errors.tc.at(-1)}
        </span>
      </div>
      <button type="submit" className="custom-form__button">
        Submit
      </button>
    </form>
  );
}
