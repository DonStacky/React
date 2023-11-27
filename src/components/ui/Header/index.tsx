import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header = () => {
  return (
    <header>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/uncontrolled-form">Uncontrolled form</NavLink>
      <NavLink to="/react-hook-form">React Hook Form</NavLink>
    </header>
  );
};
