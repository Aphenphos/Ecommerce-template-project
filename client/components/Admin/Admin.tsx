import { FC, ReactElement, useState } from 'react';
import { useUser } from '../../context/useUser';
import { deleteUser } from '../../services/admin';
import { Navigate } from 'react-router-dom';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [userID, setuserID] = useState('');
    const { user, loading, admin } = useUser();
    const submitRMUser = async (e: any) => {
      e.preventDefault();
      await deleteUser(userID);
    };
    if (loading) {
      return <>LOADING</>;
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }

    if (!admin) {
      return <Navigate replace to="/" />;
    }
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
          <button>Submit</button>
        </form>
      </>
    );
  };
  component.displayName = 'Admin';
  return component;
};
