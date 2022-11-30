import e from 'express';
import { FC, ReactElement } from 'react';
import { useCartItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';
import { Navigate } from 'react-router-dom';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { cartItems, cLoading, itemData } = useCartItems();
    if (loading || cLoading) {
      return <>LOADING</>;
    }
    if (!user) {
      return <Navigate replace to="/auth/sign-in" />;
    }

    function accessItemData(itemId: number) {
      let item;
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].id === itemId) {
          item = itemData[i];
          console.log(item);
        }
      }
      return item;
    }
    const handleCheckout = async () => {
      await checkoutUser(cartItems);
    };
    return (
      <div>
        <div id="cart-container">
          {cartItems.map((item: any, index: number) => (
            <div key={item.id} className="cart-item">
              <span>{accessItemData(item.item_id).item_name}</span>
              <span>{item.item_quantity}</span>
              <span>{accessItemData(item.item_id).item_price}</span>
              <input
                name="quant"
                type="number"
                value={item.quant}
                defaultValue={1}
              ></input>
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
