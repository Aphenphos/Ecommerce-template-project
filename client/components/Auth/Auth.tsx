import React, { ReactElement, useState, type FC } from 'react';
import {
  getUser,
  logoutUser,
  signInUser,
  signUpUser,
} from '../../services/auth';
export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayEmail, setDisplayEmail] = useState('');

    const submitSignUp = async (e: any) => {
      e.preventDefault();
      await signUpUser(email, password);
    };

    const submitSignIn = async (e: any) => {
      e.preventDefault();
      await signInUser(email, password);
    };

    const logMe = async () => {
      const data = await getUser();
      setDisplayEmail(data.email);
    };

    const logOut = async () => {
      await logoutUser();
    };
    return (
      <>
        <span>{displayEmail}</span>
        <button onClick={logOut}>LogOut</button>
        <div id="sign-up-container">
          <form id="sign-up-form" onSubmit={submitSignUp}>
            <label>
              Email:
              <input
                type="email"
                className="email-input"
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
                className="password-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              ></input>
            </label>
            <button id="submit-sign-up">Submit</button>
          </form>

          <form id="log-in-form" onSubmit={submitSignIn}>
            <label>
              Email:
              <input
                type="email"
                className="email-input"
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
                className="password-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              ></input>
            </label>
            <button id="submit-log-in">Submit</button>
          </form>

          <button onClick={logMe}>log me</button>
        </div>
      </>
    );
  };
  component.displayName = 'Auth';
  return component;
};
