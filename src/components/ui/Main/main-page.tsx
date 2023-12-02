import { useAppSelector } from '../../../store/hook';
import './main-page.scss';
import clsx from 'clsx';

export const MainPage = () => {
  const formData = useAppSelector((state) => state.formData.value);
  console.log(formData);

  if (formData.length === 0) {
    return <h3 className="main-page">There&apos;s nothing here...</h3>;
  } else {
    return (
      <div className="main-page">
        {formData.map((submit, index) => {
          return (
            <div
              key={index}
              className={clsx(
                'tile',
                index === formData.length - 1 ? 'tile--new' : ''
              )}
            >
              <div className="tile__text">
                <h3>{submit.form}</h3>
                <span>Name: {submit.name}</span>
                <span>Age: {submit.age}</span>
                <span>E-mail: {submit.email}</span>
                <span>Gender: {submit.gender}</span>
                <span>Country: {submit.country}</span>
                <span>T&C: {`${submit.tc}`}</span>
                <span>Password: {submit.password}</span>
              </div>
              <div className="tile__img">
                <img src={submit.image as string} alt="avatar"></img>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
