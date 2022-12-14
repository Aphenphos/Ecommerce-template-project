import { ReactElement, useContext, useState, type FC } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/useUser';
import { logoutUser, signUpUser } from '../../services/auth';
import styles from './Auth.module.css';
import popupFn from '../Popup/Popup';
import { usePopup } from '../../context/usePopup';
const Popup = popupFn();
export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, setUser, loading } = useUser();
    const { type } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { message, setmChange } = usePopup();

    if (loading) {
      return <>LOADING</>;
    }
    if (user) {
      return <Navigate replace to="/" />;
    }

    const submitSign = async (e: any) => {
      e.preventDefault();
      const userData = await signUpUser(type!, email, password);
      if (!userData) {
        setmChange('Invalid username or password');
      } else {
        setUser(userData);
        window.location.reload();
      }
    };
    return (
      <div id={styles.auth}>
        <span id={styles.type}>
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </span>
        <div id={styles.signUpContainer}>
          <form className={styles.form} onSubmit={submitSign}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            ></input>

            <label className={styles.label}>Password</label>
            <input
              title="Password must contain at least 9 characters. A upper and lower case letter, a symbol, and a number."
              type="password"
              pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$"
              className={styles.input}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            ></input>

            <button className={styles.submitButton}>Submit</button>
          </form>
          <div>
            {type === 'sign-in' ? (
              <div id={styles.prompt}>
                <span>Dont have an account?</span>
                <Link to="/auth/sign-up" id={styles.signButton}>
                  Sign Up
                </Link>
              </div>
            ) : (
              <div id={styles.prompt}>
                <span>Already have an account?</span>
                <Link to="/auth/sign-in" id={styles.signButton}>
                  Sign In
                </Link>
              </div>
            )}
          </div>
          {message && <Popup></Popup>}
        </div>
      </div>
    );
  };
  component.displayName = 'Auth';
  return component;
};
