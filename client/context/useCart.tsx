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
  const [cartChange, setCartChange] = useState({});

  useEffect(() => {
    console.log('change');
    console.log(cartChange);
    async function fetchCart() {
      setcLoading(true);
      const cItems = await getCart();
      return cItems;
    }
    async function fetchItemData() {
      const cItems = await fetchCart();
      if (!cItems) {
        console.log('hit this');
        setCartItems([]);
        setItemData([]);
        setcLoading(false);
        return;
      }
      const iData = await getArrOfItems(cItems);
      setItemData(iData);
      setCartItems(cItems);
      setcLoading(false);
    }
    fetchItemData();
  }, [cartChange]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemData,
        cLoading,
        setcLoading,
        cartChange,
        setCartChange,
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
