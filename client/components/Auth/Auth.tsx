import React, { ReactElement, useState, type FC } from 'react';
import { signInUser, signUpUser } from '../../services/auth';
export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitSignUp = async (e: any) => {
      e.preventDefault();
      const resp = await signUpUser(email, password);
      console.log(await resp);
    };

    const submitSignIn = async (e: any) => {
      e.preventDefault();
      const resp = await signInUser(email, password);
      console.log(await resp);
    };
    return (
      <div id="sign-up-container">
        <form id="sign-up-form" onSubmit={submitSignIn}>
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
      </div>
    );
  };
  component.displayName = 'Auth';
  return component;
};
