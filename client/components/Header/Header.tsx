import { FC, ReactElement, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/useUser';
import styles from './Header.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user } = useContext(UserContext);

    return (
      <div id={styles.header}>
        <Link to="/">Home</Link>
        <Link to="/auth/sign-in">Sign-In</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/vendor">Vendor</Link>
      </div>
    );
  };
  component.displayName = 'Header';
  return component;
};
