import { FC, ReactElement, useState } from 'react';
import { deleteUser } from '../../services/admin';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [userID, setuserID] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const submitRMUser = async (e: any) => {
      e.preventDefault();
      await deleteUser(userID);
    };
    return (
      <>
        <form id="rm-user-form" onSubmit={submitRMUser}>
          <input
            type="number"
            placeholder="id"
            onChange={(e) => {
              setuserID(e.target.value);
            }}
          ></input>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
          <button>Submit</button>
        </form>
      </>
    );
  };
  component.displayName = 'Admin';
  return component;
};
