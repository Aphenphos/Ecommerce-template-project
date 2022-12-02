import { FC, ReactElement, useEffect, useState } from 'react';
import { useUser } from '../../context/useUser';
import {
  addVendor,
  deleteUser,
  getVendors,
  removeVendor,
  searchUsersByEmail,
} from '../../services/admin';
import { Navigate } from 'react-router-dom';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [vendorList, setVendorList] = useState([]);
    const [userList, setUserList] = useState([]);
    const { user, loading, admin, setLoading } = useUser();
    const submitUserSearch = async (e: any) => {
      e.preventDefault();
      const result = await searchUsersByEmail(
        e.target.searchParams.value
      );
      setUserList(result);
    };
    const submitNewVendor = async (e: any) => {
      e.preventDefault();
      await addVendor(e.target.value);
    };
    const submitRMVendor = async (e: any) => {
      e.preventDefault();
      await removeVendor(e.target.value);
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

    useEffect(() => {
      async function fetchVendors() {
        const vendorsInfo = await getVendors();
        console.log(vendorsInfo);
        setVendorList(vendorsInfo);
      }
      fetchVendors();
    }, []);
    return (
      <>
        <div>
          Current Vendors
          {vendorList.map((vendor: any) => (
            <div key={vendor.vendor_id}>
              <span>{vendor.vendor_email}</span>
              <button
                value={vendor.vendor_id}
                onClick={submitRMVendor}
              >
                Remove Vendor
              </button>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={submitUserSearch}>
            <label>
              Search Users:
              <input type="text" name="searchParams"></input>
            </label>
          </form>
        </div>
        <div>
          {userList[0] ? (
            userList.map((user: any, index) => (
              <div key={user.id + index}>
                <span>{user.email}</span>
                <button value={user.id}>Make Vendor</button>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };
  component.displayName = 'Admin';
  return component;
};
