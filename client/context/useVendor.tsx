import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getItemByVendor } from '../services/item';

const VendorContext = createContext([] as any);

const VendorProvider = ({ children }: { children: any }) => {
  const [vItems, setvItems] = useState([]);
  const [viLoading, setviLoading] = useState(true);
  const [change, setChange] = useState({});

  useEffect(() => {
    async function fetchItems() {
      setviLoading(true);
      const pvItems = await getItemByVendor();
      setvItems(pvItems);
      setviLoading(false);
    }

    fetchItems();
  }, [change]);

  return (
    <VendorContext.Provider
      value={{ vItems, change, setChange, viLoading }}
    >
      {children}
    </VendorContext.Provider>
  );
};

function useVendor() {
  const context = useContext(VendorContext);
  if (context === undefined || context === null) {
    throw new Error('Missing VendorProvider');
  }
  return context;
}

export { useVendor, VendorProvider };
