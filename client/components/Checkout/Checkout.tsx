import e from 'express';
import { FC, ReactElement } from 'react';
import { useCartItems } from '../../context/useCart';
import { useUser } from '../../context/useUser';
import { checkoutUser } from '../../services/checkout';

export type Props = {};
export type Component = FC<Props>;

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { user, loading } = useUser();
    const { cartItems, cloading, itemData } = useCartItems();
    if (loading || cloading) {
      return <>LOADING</>;
    }

    const handleCheckout = async () => {
      await checkoutUser(cartItems);
    };
    return (
      <div>
        <div id="cart-container">
          {cartItems.map((item: any, index: number) => (
            <div key={item.id} className="cart-item">
              <span>{itemData[index].item_name}</span>
              <span>{item.item_quantity}</span>
              <span>{itemData[index].item_price}</span>
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
