import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCart } from '../services/cart';

const CartContext = createContext([] as any);

const CartProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cLoading, setcLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setcLoading(true);
      const pItems = await getCart();
      setCartItems(pItems);
    }
    fetch();
    setcLoading(false);
  }, []);
  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cLoading, setcLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCartItems() {
  const context = useContext(CartContext);
  if (context === undefined || context === null) {
    throw new Error('Missing CartProvider');
  }
  return context;
}

export { useCartItems, CartProvider };
