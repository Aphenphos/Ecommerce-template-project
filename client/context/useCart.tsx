import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCart } from '../services/cart';
import { getArrOfItems } from '../services/item';

const CartContext = createContext([] as any);

const CartProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cLoading, setcLoading] = useState(true);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    async function fetch() {
      setcLoading(true);
      const pItems = await getCart();
      const iData = await getArrOfItems(pItems);
      setItemData(iData);
      setCartItems(pItems);
    }
    fetch();
    setcLoading(false);
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemData,
        setItemData,
        cLoading,
        setcLoading,
      }}
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
