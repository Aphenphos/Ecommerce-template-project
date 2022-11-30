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
  const [itemData, setItemData] = useState([]);
  const [cLoading, setcLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      setcLoading(true);
      const cItems = await getCart();
      return cItems;
    }
    async function fetchItemData() {
      const cItems = await fetchCart();
      const iData = await getArrOfItems(cItems);
      setItemData(iData);
      setCartItems(cItems);
      setcLoading(false);
    }
    fetchItemData();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemData,
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
