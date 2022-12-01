import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { verifyAdmin } from '../services/admin';
import { getUser, verifyVendor } from '../services/auth';

const UserContext = createContext({} as any);

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [vendor, setVendor] = useState(false);

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
      console.log('vendor?', pVendor);
      setVendor(pVendor);
      setLoading(false);
    }
    async function fetchAdmin() {
      setLoading(true);
      const pAdmin = await verifyAdmin();
      console.log(pAdmin);
      setAdmin(pAdmin);
      setLoading(false);
    }
    fetch();
    if (user) {
      fetchVendor();
      fetchAdmin();
    }
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        admin,
        setAdmin,
        vendor,
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
