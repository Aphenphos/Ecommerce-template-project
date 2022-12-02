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
      if (userData.message) {
        setmChange(userData.message);
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
            <label>
              Email:
              <input
                type="email"
                className={styles.input}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              ></input>
            </label>

            <label>
              Password:
              <input
                type="password"
                className={styles.input}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              ></input>
            </label>
            <button className={styles.submitButton}>Submit</button>
          </form>
          {type === 'sign-in' ? (
            <>
              Dont have an account?{' '}
              <Link to="/auth/sign-up">Sign Up</Link>
            </>
          ) : (
            <>
              Already have an account?
              <Link to="/auth/sign-in">Sign In</Link>
            </>
          )}
        </div>
        {message && <Popup></Popup>}
      </div>
    );
  };
  component.displayName = 'Auth';
  return component;
};
