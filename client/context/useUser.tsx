import { createContext, useState } from 'react';
import { getUser } from '../services/auth';

const UserContext = createContext({} as any);

const UserProvider = ({ children }: { children: any }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
