import { FC, ReactElement, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../../context/useUser';
import { logoutUser } from '../../services/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import styles from './Header.module.css';
import popupFn from '../Popup/Popup';
import { usePopup } from '../../context/usePopup';
const Popup = popupFn();

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { message, setmChange } = usePopup();
    const {
      user,
      vendor,
      admin,
      setUser,
      loading,
      setAdmin,
      setVendor,
      setUChange,
    } = useUser();
    if (loading) {
      return <div>loading</div>;
    }

    const logOut = async () => {
      await logoutUser();
      setUser(null);
      setAdmin(false);
      setVendor(false);
      setUChange({ action: 'logout' });
    };
    return (
      <div id={styles.header}>
        {message && <Popup />}
        <Link to="/">
          <BiHome id={styles.home} />
        </Link>
        {vendor ? <Link to="/vendor">Vendor Tools</Link> : <></>}
        {admin ? <Link to="/admin">Admin</Link> : <></>}
        {user ? (
          <div id={styles.userInfo}>
            <span>{user.email}</span>
            <button onClick={logOut}>Log Out</button>{' '}
          </div>
        ) : (
          <Link to="/auth/sign-in">Sign-In/Up</Link>
        )}
        <Link to="/checkout" id={styles.cart}>
          <AiOutlineShoppingCart />
        </Link>
      </div>
    );
  };
  component.displayName = 'Header';
  return component;
};
