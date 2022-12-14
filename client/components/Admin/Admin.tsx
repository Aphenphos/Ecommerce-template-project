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
import loader from '../../styles/loader.module.css';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [vendorList, setVendorList] = useState([] as any);
    const [userList, setUserList] = useState([]);
    const [change, setChange] = useState({});
    const { user, loading, admin, setLoading } = useUser();

    useEffect(() => {
      async function fetchVendors() {
        setLoading(true);
        const vendorsInfo = await getVendors();
        setVendorList(vendorsInfo);
        setLoading(false);
      }
      fetchVendors();
    }, [change]);

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
      setChange({ change: e.target.value });
    };
    const submitRMVendor = async (e: any) => {
      e.preventDefault();
      await removeVendor(e.target.value);
      setChange({ change: e.target.value });
    };
    function isVendor(userId: number) {
      let aVendor = false;
      if (vendorList[0]) {
        for (let i = 0; i < vendorList.length; i++) {
          if (userId === vendorList[i].vendor_id) {
            aVendor = true;
          }
          if (aVendor === true) {
            return <div>Is a vendor</div>;
          }
        }
      }
      return (
        <button value={userId} onClick={submitNewVendor}>
          Make Vendor
        </button>
      );
    }
    if (loading) {
      return (
        <div id={loader.center}>
          <div className={loader.loader}></div>
        </div>
      );
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }
    if (!admin) {
      return <Navigate replace to="/" />;
    }
    return (
      <>
        <div>
          Current Vendors
          {vendorList[0] ? (
            vendorList.map((vendor: any) => (
              <div key={vendor.vendor_id}>
                <span>{vendor.vendor_email}</span>
                <button
                  value={vendor.vendor_id}
                  onClick={submitRMVendor}
                >
                  Remove Vendor
                </button>
              </div>
            ))
          ) : (
            <div>No Vendors</div>
          )}
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
          {userList ? (
            userList.map((user: any, index) => (
              <div key={user.id + index}>
                <span>{user.email}</span>
                {isVendor(user.id)}
              </div>
            ))
          ) : (
            <>No users found</>
          )}
        </div>
      </>
    );
  };
  component.displayName = 'Admin';
  return component;
};
