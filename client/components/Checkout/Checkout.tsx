import e from 'express';
import { FC, ReactElement } from 'react';
import { useCartItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';
import { Navigate } from 'react-router-dom';
import { removeFromCart } from '../../services/cart';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  //fix this not updating properly despite using context
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { cartItems, cLoading, itemData, setCartChange } =
      useCartItems();
    if (loading) {
      return <>LOADING</>;
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }
    if (cLoading) {
      return <>Loading Items</>;
    }
    function accessItemData(itemId: number) {
      let item;
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].id === itemId) {
          item = itemData[i];
        }
      }
      return item;
    }
    const handleCheckout = async () => {
      await checkoutUser(cartItems);
    };

    const handleRemove = async (e: any) => {
      await removeFromCart(e.target.value);
      setCartChange({ change: e.target.value });
    };
    return (
      <div>
        <div id="cart-container">
          {cartItems.map((item: any) => (
            <div key={item.id} className="cart-item">
              <span>{accessItemData(item.item_id).item_name}</span>
              <span>{accessItemData(item.item_id).item_price}</span>
              <input
                name="quant"
                type="number"
                value={item.quant}
                defaultValue={item.item_quantity}
              ></input>
              <button value={item.id} onClick={handleRemove}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    );
  };
  component.displayname = 'Checkout';
  return component;
};
