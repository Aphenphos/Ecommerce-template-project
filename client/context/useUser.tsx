import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { verifyAdmin } from '../services/admin';
import { getUser, verifyVendor } from '../services/auth';

const UserContext = createContext({} as any);
//allows fetching of all information of a user to check their access to various pages.
const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [vendor, setVendor] = useState(false);
  const [uChange, setUChange] = useState({});

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const pUser = await getUser();
      setUser(pUser);
      setLoading(false);
    }
    async function fetchVendor() {
      setLoading(true);
      const pVendor = await verifyVendor();
      setVendor(pVendor);
      setLoading(false);
    }
    async function fetchAdmin() {
      setLoading(true);
      const pAdmin = await verifyAdmin();
      setAdmin(pAdmin);
      setLoading(false);
    }
    fetch();
    if (user) {
      fetchVendor();
      fetchAdmin();
    }
  }, [uChange]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        setVendor,
        admin,
        setAdmin,
        vendor,
        setUChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined || context === null) {
    throw new Error('Missing UserProvider');
  }
  return context;
}

export { useUser, UserProvider };
