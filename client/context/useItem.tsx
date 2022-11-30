import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAllItems } from '../services/item';

const ItemContext = createContext([] as any);
//Perhaps modify this function to take in a parameter changing what
// items are fetched ex category or something with pagination.
const ItemProvider = ({ children }: { children: any }) => {
  const [items, setItems] = useState([]);
  const [iLoading, setiLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setiLoading(true);
      const pItems = await getAllItems();
      setItems(pItems);
    }
    fetch();
    setiLoading(false);
  }, []);
  return (
    <ItemContext.Provider
      value={{ items, setItems, iLoading, setiLoading }}
    >
      {children}
    </ItemContext.Provider>
  );
};

function useItems() {
  const context = useContext(ItemContext);
  if (context === undefined || context === null) {
    throw new Error('Missing ItemProvider');
  }
  return context;
}

export { useItems, ItemProvider };
