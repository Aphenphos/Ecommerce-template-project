import { FC, ReactElement, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../../context/useUser';
import { logoutUser } from '../../services/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styles from './Header.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const {
      user,
      vendor,
      admin,
      setUser,
      loading,
      setAdmin,
      setVendor,
    } = useUser();
    if (loading) {
      return <div>loading</div>;
    }

    const logOut = async () => {
      await logoutUser();
      setUser(null);
      setAdmin(false);
      setVendor(false);
      return <Navigate replace to="/" />;
    };
    return (
      <div id={styles.header}>
        <Link to="/">Home</Link>
        <Link to="/checkout" id={styles.cart}>
          <AiOutlineShoppingCart />
        </Link>
        {vendor ? <Link to="/vendor">Vendor Tools</Link> : <></>}
        {admin ? <Link to="/admin">Admin</Link> : <></>}
        {user ? (
          <div id={styles.userInfo}>
            <span>{user.email}</span>
            <button onClick={logOut}>Log Out</button>{' '}
          </div>
        ) : (
          <Link to="/auth/sign-in">Sign-In/Sign-Up</Link>
        )}
      </div>
    );
  };
  component.displayName = 'Header';
  return component;
};
