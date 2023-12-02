import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataObject, ErrorsObject } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { customFormSchema } from '../../../validations/custom-form-validation';
import { errorParser } from '../../model/errors-parser';
import { pushFormData } from '../../model/form-slice';
import { readFile } from '../../model/read-file';
import './custom-form.scss';

const big = /[A-ZА-Я]/;
const small = /[a-zа-я]/;
const num = /[0-9]/;
const spec = /[\W_]/;

export function CustomForm() {
  const [errors, setErrors] = useState<ErrorsObject>({ name: [] });
  const [protect, setProtect] = useState<number>(0);
  const countries = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLSelectElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rpassword = useRef<HTMLInputElement>(null);
  const tc = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const customFormData: DataObject = {
      name: name.current?.value,
      age: age.current?.value,
      email: email.current?.value,
      gender: gender.current?.value,
      image: {
        name: image.current?.files?.[0]?.name,
        size: image.current?.files?.[0]?.size,
      },
      country: country.current?.value,
      password: password.current?.value,
      rpassword: rpassword.current?.value,
      tc: tc.current?.checked,
      form: 'Uncontrolled form',
    };

    await customFormSchema
      .validate(customFormData, { abortEarly: false })
      .then(async () => {
        setErrors(() => ({}));
        if (handleChange()) {
          const imageFile = await readFile(image.current?.files?.[0] as File);
          dispatch(pushFormData({ ...customFormData, image: imageFile }));
          navigate('/');
        }
      })
      .catch((e) => {
        const errorObject = errorParser(e.inner);
        setErrors(errorObject);
      });
  };

  const handleChange = () => {
    if (password.current?.value !== rpassword.current?.value) {
      setErrors({ ...errors, rpassword: ['Password mismatch'] });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const checkStrength = (password: string) => {
    setProtect(0);
    if (big.test(password)) {
      setProtect((protect) => protect + 1);
    }
    if (small.test(password)) {
      setProtect((protect) => protect + 1);
    }
    if (num.test(password)) {
      setProtect((protect) => protect + 1);
    }
    if (spec.test(password)) {
      setProtect((protect) => protect + 1);
    }
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="custom-form__label">
          Name
        </label>
        <input type="text" id="name" ref={name} />
        <span className="custom-form__error">
          {errors.name && errors.name.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="age" className="custom-form__label">
          Age
        </label>
        <input type="text" id="age" ref={age} />
        <span className="custom-form__error">
          {errors.age && errors.age.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="email" className="custom-form__label">
          E-mail
        </label>
        <input type="text" id="email" ref={email} />
        <span className="custom-form__error">
          {errors.email && errors.email.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="gender" className="custom-form__label">
          Gender
        </label>
        <select id="gender-opt" ref={gender}>
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
        <input type="file" id="image" ref={image} />
        <span className="custom-form__error">
          {errors.image && errors.image.at(-1)}
        </span>
      </div>
      <div>
        <label htmlFor="country" className="custom-form__label">
          Choose the country
        </label>
        <input type="text" id="country" list="country-list" ref={country} />
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
          ref={password}
          onChange={() => checkStrength(password.current?.value || '')}
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
          ref={rpassword}
          onChange={handleChange}
        />
        <span className="custom-form__error">
          {errors.rpassword && errors.rpassword.at(-1)}
        </span>
        <div
          className={clsx(
            'password__meter',
            protect <= 2
              ? 'password__meter--weak'
              : protect <= 3
                ? 'password__meter--medium'
                : 'password__meter--strong'
          )}
        ></div>
        <span className="password__strength">
          {protect <= 2
            ? 'Weak password'
            : protect <= 3
              ? 'Medium password'
              : 'Strong password'}
        </span>
      </div>
      <div>
        <label htmlFor="t&c" className="custom-form__t-and-c">
          Accept T&C <input type="checkbox" id="t&c" ref={tc} />
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
