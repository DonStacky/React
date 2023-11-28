import './custom-form.scss';

export function CustomForm() {
  return (
    <form className="custom-form">
      <div>
        <label htmlFor="name" className="custom-form__label">
          Name
        </label>
        <input type="text" id="name" />
        <span className="custom-form__error">Error message</span>
      </div>
      <div>
        <label htmlFor="age" className="custom-form__label">
          Age
        </label>
        <input type="text" id="age" />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="email" className="custom-form__label">
          E-mail
        </label>
        <input type="email" id="email" />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="gender" className="custom-form__label">
          Gender
        </label>
        <input type="text" id="gender" />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="image" className="custom-form__label">
          Upload a picture
        </label>
        <input type="file" id="image" />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="country" className="custom-form__label">
          Choose the country
        </label>
        <select />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="password" className="custom-form__label">
          Password
        </label>
        <input type="password" id="password" />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="rpassword" className="custom-form__label">
          Repeat password
        </label>
        <input type="password" id="rpassword" />
        <span className="custom-form__error"></span>
      </div>
      <div>
        <label htmlFor="t&c" className="custom-form__t-and-c">
          Accept T&C <input type="checkbox" id="t&c" />
        </label>
        <span className="custom-form__error"></span>
      </div>
      <button type="submit" className="custom-form__button">
        Submit
      </button>
    </form>
  );
}
