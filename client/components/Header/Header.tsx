import { FC, ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/useUser';
import { logoutUser } from '../../services/auth';
import styles from './Header.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, setUser, loading } = useUser();
    if (loading) {
      return <div>loading</div>;
    }

    const logOut = async () => {
      await logoutUser();
      setUser(null);
    };
    return (
      <div id={styles.header}>
        <Link to="/">Home</Link>
        <Link to="/auth/sign-in">Sign-In</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/vendor">Vendor</Link>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logOut}>Log Out</button>{' '}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  component.displayName = 'Header';
  return component;
};
