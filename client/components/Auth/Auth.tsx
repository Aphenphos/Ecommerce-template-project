import React, { ReactElement, useState, type FC } from 'react';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <div id="log-in-container">
        <form id="log-in-form">
          <label>
            Email:
            <input
              type="email"
              id="email-input"
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
              id="password-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            ></input>
          </label>
          <button id="submit-login">Submit</button>
        </form>
      </div>
    );
  };
  component.displayName = 'Auth';
  return component;
};
