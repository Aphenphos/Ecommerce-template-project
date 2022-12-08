import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCart } from '../services/cart';
import { getArrOfItems } from '../services/item';
//Used to track a users cart across pages allowing
//for quicker loadtimes upon opening the Checkout page as well as
//'future proofing' for features like viewing total items in cart
//and viewing a small preview of what is in your cart on hover
const CartContext = createContext([] as any);

const CartProvider = ({ children }: { children: any }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [cLoading, setcLoading] = useState(true);
  const [cartChange, setCartChange] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      setcLoading(true);
      const cItems = await getCart();
      return cItems;
    }
    async function fetchItemData() {
      const cItems = await fetchCart();
      if (!cItems) {
        setCartItems([]);
        setItemData([]);
        setcLoading(false);
        return;
      }
      const t = cItems.reduce(
        (acc: number, n: any) => acc + n.item_price * n.item_quantity,
        0
      );
      const iData = await getArrOfItems(cItems);
      setTotal(t);
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
        total,
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
