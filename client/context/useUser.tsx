import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../services/auth';

const UserContext = createContext({} as any);

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const pUser = await getUser();
      setUser(pUser);
    }
    fetch();
    setLoading(false);
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading }}
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
