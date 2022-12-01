import { FC, ReactElement, useEffect, useState } from 'react';
import { useUser } from '../../context/useUser';
import {
  deleteUser,
  getVendors,
  removeVendor,
} from '../../services/admin';
import { Navigate } from 'react-router-dom';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const [userID, setuserID] = useState('');
    const [vendorList, setVendorList] = useState([]);
    const { user, loading, admin, setLoading } = useUser();
    const submitRMUser = async (e: any) => {
      e.preventDefault();
      await deleteUser(userID);
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
      </>
    );
  };
  component.displayName = 'Admin';
  return component;
};
