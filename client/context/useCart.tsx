import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getItems } from '../services/cart';

const CartContext = createContext([] as any);

const CartProvider = ({ children }: { children: any }) => {
  const [items, setItems] = useState([]);
  const [iLoading, setiLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setiLoading(true);
      const pItems = await getItems();
      setItems(pItems);
    }
    fetch();
    setiLoading(false);
  }, []);
  return (
    <CartContext.Provider
      value={{ items, setItems, iLoading, setiLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useItems() {
  const context = useContext(CartContext);
  if (context === undefined || context === null) {
    throw new Error('Missing CartProvider');
  }
  return context;
}

export { useItems, CartProvider };
